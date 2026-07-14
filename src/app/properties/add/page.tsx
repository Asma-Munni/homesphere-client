"use client";

/* eslint-disable @next/next/no-img-element */

import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { API_URL } from "@/lib/api";

import { useSession } from "@/lib/auth-client";



interface PropertyFormData {
  title: string;
  shortDescription: string;
  description: string;
  price: string;
  location: string;
  category: string;
  bedrooms: string;
  bathrooms: string;
}

interface AuthUser {
  name?: string;
  email?: string;
  role?: string;
}

interface ApiResponse {
  success?: boolean;
  message?: string;
  url?: string;
}

const initialFormData: PropertyFormData = {
  title: "",
  shortDescription: "",
  description: "",
  price: "",
  location: "",
  category: "",
  bedrooms: "",
  bathrooms: "",
};

const categories = [
  "Apartment",
  "House",
  "Villa",
  "Condo",
  "Studio",
  "Commercial",
];

export default function AddPropertyPage() {
  const router = useRouter();

  const {
    data,
    isPending,
  } = useSession();

  const userId =
    data?.session?.userId;

  const user =
    data?.user as
      | AuthUser
      | undefined;

  const userRole =
    user?.role;

  const fileInputRef =
    useRef<HTMLInputElement>(
      null
    );

  const authToastShown =
    useRef(false);

  const [
    formData,
    setFormData,
  ] =
    useState<PropertyFormData>(
      initialFormData
    );

  const [
    imageFile,
    setImageFile,
  ] =
    useState<File | null>(
      null
    );

  const [
    preview,
    setPreview,
  ] = useState("");

  const [
    loading,
    setLoading,
  ] = useState(false);

  /*
   * Protect the page from
   * unauthenticated users.
   */
  useEffect(() => {
    if (isPending) {
      return;
    }

    if (!userId) {
      if (
        !authToastShown.current
      ) {
        toast.error(
          "Please login to add a property."
        );

        authToastShown.current =
          true;
      }

      router.replace(
        "/login?callbackUrl=/properties/add"
      );

      return;
    }

    /*
     * Role is checked only when
     * the role exists in the session.
     */
    if (
      userRole &&
      userRole !==
        "property-holder" &&
      userRole !== "admin"
    ) {
      if (
        !authToastShown.current
      ) {
        toast.error(
          "Only property holders can add properties."
        );

        authToastShown.current =
          true;
      }

      router.replace(
        "/dashboard"
      );
    }
  }, [
    isPending,
    router,
    userId,
    userRole,
  ]);

  /*
   * Remove the temporary image URL
   * when preview changes or the
   * component is removed.
   */
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(
          preview
        );
      }
    };
  }, [preview]);

  const handleChange = (
    event: ChangeEvent<
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement
    >
  ) => {
    const {
      name,
      value,
    } = event.target;

    setFormData(
      (previousData) => ({
        ...previousData,
        [name]: value,
      })
    );
  };

  const handleImageChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    if (
      !file.type.startsWith(
        "image/"
      )
    ) {
      toast.error(
        "Please select a valid image file."
      );

      event.target.value = "";

      return;
    }

    const maximumFileSize =
      5 * 1024 * 1024;

    if (
      file.size >
      maximumFileSize
    ) {
      toast.error(
        "The image must be smaller than 5 MB."
      );

      event.target.value = "";

      return;
    }

    const previewUrl =
      URL.createObjectURL(file);

    setImageFile(file);
    setPreview(previewUrl);
  };

  const removeImage = () => {
    if (preview) {
      URL.revokeObjectURL(
        preview
      );
    }

    setImageFile(null);
    setPreview("");

    if (
      fileInputRef.current
    ) {
      fileInputRef.current.value =
        "";
    }
  };

  const validateForm = () => {
    if (
      !formData.title.trim()
    ) {
      toast.error(
        "Property title is required."
      );

      return false;
    }

    if (!formData.category) {
      toast.error(
        "Please select a category."
      );

      return false;
    }

    if (
      !formData.location.trim()
    ) {
      toast.error(
        "Property location is required."
      );

      return false;
    }

    const price = Number(
      formData.price
    );

    if (
      !Number.isFinite(price) ||
      price <= 0
    ) {
      toast.error(
        "Please enter a valid property price."
      );

      return false;
    }

    const bedrooms = Number(
      formData.bedrooms
    );

    if (
      !Number.isInteger(
        bedrooms
      ) ||
      bedrooms < 0
    ) {
      toast.error(
        "Please enter a valid number of bedrooms."
      );

      return false;
    }

    const bathrooms = Number(
      formData.bathrooms
    );

    if (
      !Number.isInteger(
        bathrooms
      ) ||
      bathrooms < 0
    ) {
      toast.error(
        "Please enter a valid number of bathrooms."
      );

      return false;
    }

    if (
      !formData.shortDescription.trim()
    ) {
      toast.error(
        "Short description is required."
      );

      return false;
    }

    if (
      !formData.description.trim()
    ) {
      toast.error(
        "Full description is required."
      );

      return false;
    }

    if (!imageFile) {
      toast.error(
        "Please select a property image."
      );

      return false;
    }

    return true;
  };

  const uploadImage = async (
    token: string
  ) => {
    if (!imageFile) {
      throw new Error(
        "Property image is required."
      );
    }

    const uploadData =
      new FormData();

    uploadData.append(
      "image",
      imageFile
    );

    const response =
      await fetch(
        `${API_URL}/upload`,
        {
          method: "POST",

          headers: {
            Authorization:
              `Bearer ${token}`,
          },

          body: uploadData,
        }
      );

    const result =
      (await response.json()) as
        ApiResponse;

    if (
      !response.ok ||
      !result.url
    ) {
      throw new Error(
        result.message ??
          "Image upload failed."
      );
    }

    return result.url;
  };

  const resetForm = () => {
    setFormData(
      initialFormData
    );

    removeImage();
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!userId) {
      toast.error(
        "Please login first."
      );

      router.replace(
        "/login?callbackUrl=/properties/add"
      );

      return;
    }

    if (!validateForm()) {
      return;
    }

    const token =
      window.localStorage.getItem(
        "token"
      );

    if (!token) {
      toast.error(
        "Your login token was not found. Please login again."
      );

      router.replace("/login");

      return;
    }

    try {
      setLoading(true);

      const imageUrl =
        await uploadImage(token);

      const propertyData = {
        title:
          formData.title.trim(),

        shortDescription:
          formData.shortDescription.trim(),

        description:
          formData.description.trim(),

        price: Number(
          formData.price
        ),

        location:
          formData.location.trim(),

        category:
          formData.category,

        bedrooms: Number(
          formData.bedrooms
        ),

        bathrooms: Number(
          formData.bathrooms
        ),

        image: imageUrl,

        images: [imageUrl],

        ownerId: userId,

        status: "available",
      };

      const response =
        await fetch(
          `${API_URL}/properties`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${token}`,
            },

            body: JSON.stringify(
              propertyData
            ),
          }
        );

      const result =
        (await response.json()) as
          ApiResponse;

      if (
        !response.ok ||
        !result.success
      ) {
        throw new Error(
          result.message ??
            "Failed to add property."
        );
      }

      toast.success(
        "Property added successfully!"
      );

      resetForm();

      /*
       * Change this route when your
       * manage properties route is
       * different.
       */
      router.push(
        "/dashboard/holder/properties"
      );

      router.refresh();
    } catch (error) {
      console.error(
        "ADD PROPERTY ERROR:",
        error
      );

      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong.";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto size-10 animate-spin rounded-full border-4 border-slate-200 border-t-teal-700" />

          <p className="mt-4 text-sm font-medium text-slate-600">
            Checking your
            account...
          </p>
        </div>
      </div>
    );
  }

  if (!userId) {
    return null;
  }

  if (
    userRole &&
    userRole !==
      "property-holder" &&
    userRole !== "admin"
  ) {
    return null;
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Page heading */}

        <div className="mb-8">
          <span className="inline-flex rounded-full bg-teal-50 px-4 py-1.5 text-sm font-semibold text-teal-700">
            Property Listing
          </span>

          <h1 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
            Add New Property
          </h1>

          <p className="mt-3 max-w-2xl leading-7 text-slate-600">
            Provide accurate
            information and upload
            a clear image to publish
            your property on
            HomeSphere.
          </p>

          {user?.email && (
            <p className="mt-3 text-sm text-slate-500">
              Adding property as{" "}
              <span className="font-semibold text-slate-700">
                {user.email}
              </span>
            </p>
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-7 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
        >
          {/* Main information */}

          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Basic Information
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Enter the main
              information about the
              property.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <FormField
              label="Property Title"
              name="title"
              type="text"
              placeholder="Modern Family Apartment"
              value={
                formData.title
              }
              onChange={
                handleChange
              }
              required
            />

            <div>
              <label
                htmlFor="category"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Category
              </label>

              <select
                id="category"
                name="category"
                value={
                  formData.category
                }
                onChange={
                  handleChange
                }
                required
                className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-teal-700 focus:ring-2 focus:ring-teal-100"
              >
                <option value="">
                  Select category
                </option>

                {categories.map(
                  (category) => (
                    <option
                      key={
                        category
                      }
                      value={
                        category
                      }
                    >
                      {category}
                    </option>
                  )
                )}
              </select>
            </div>

            <FormField
              label="Monthly Price"
              name="price"
              type="number"
              placeholder="25000"
              value={
                formData.price
              }
              onChange={
                handleChange
              }
              min="1"
              required
            />

            <FormField
              label="Location"
              name="location"
              type="text"
              placeholder="Dhaka, Bangladesh"
              value={
                formData.location
              }
              onChange={
                handleChange
              }
              required
            />

            <FormField
              label="Bedrooms"
              name="bedrooms"
              type="number"
              placeholder="3"
              value={
                formData.bedrooms
              }
              onChange={
                handleChange
              }
              min="0"
              required
            />

            <FormField
              label="Bathrooms"
              name="bathrooms"
              type="number"
              placeholder="2"
              value={
                formData.bathrooms
              }
              onChange={
                handleChange
              }
              min="0"
              required
            />
          </div>

          {/* Description */}

          <div className="border-t border-slate-200 pt-7">
            <h2 className="text-xl font-bold text-slate-900">
              Property
              Description
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Describe the property
              clearly for potential
              tenants.
            </p>
          </div>

          <div>
            <label
              htmlFor="shortDescription"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Short Description
            </label>

            <input
              id="shortDescription"
              name="shortDescription"
              value={
                formData.shortDescription
              }
              onChange={
                handleChange
              }
              maxLength={150}
              required
              placeholder="A comfortable apartment in a convenient location"
              className="h-12 w-full rounded-xl border border-slate-300 px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-teal-700 focus:ring-2 focus:ring-teal-100"
            />

            <p className="mt-1 text-right text-xs text-slate-400">
              {
                formData
                  .shortDescription
                  .length
              }
              /150
            </p>
          </div>

          <div>
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Full Description
            </label>

            <textarea
              id="description"
              rows={6}
              name="description"
              value={
                formData.description
              }
              onChange={
                handleChange
              }
              required
              placeholder="Describe the property, nearby facilities, important features and rental conditions..."
              className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-teal-700 focus:ring-2 focus:ring-teal-100"
            />
          </div>

          {/* Image upload */}

          <div className="border-t border-slate-200 pt-7">
            <h2 className="text-xl font-bold text-slate-900">
              Property Image
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Upload a JPG, PNG or
              WebP image smaller than
              5 MB.
            </p>
          </div>

          <div>
            <label
              htmlFor="property-image"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Select Image
            </label>

            <input
              ref={fileInputRef}
              id="property-image"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={
                handleImageChange
              }
              required={
                !imageFile
              }
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-600 file:mr-4 file:rounded-lg file:border-0 file:bg-teal-700 file:px-4 file:py-2 file:font-semibold file:text-white hover:file:bg-teal-800"
            />

            {preview && (
              <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <img
                  src={preview}
                  alt="Selected property preview"
                  className="h-64 w-full rounded-xl object-cover"
                />

                <div className="mt-3 flex items-center justify-between gap-4">
                  <p className="truncate text-sm text-slate-600">
                    {
                      imageFile?.name
                    }
                  </p>

                  <button
                    type="button"
                    onClick={
                      removeImage
                    }
                    className="shrink-0 rounded-lg border border-red-200 px-3 py-1.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Actions */}

          <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-7 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() =>
                router.back()
              }
              disabled={loading}
              className="h-12 rounded-xl border border-slate-300 px-6 font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              disabled={loading}
              type="submit"
              className="flex h-12 items-center justify-center rounded-xl bg-teal-700 px-7 font-semibold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Adding Property..."
                : "Add Property"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

interface FormFieldProps {
  label: string;
  name:
    | "title"
    | "price"
    | "location"
    | "bedrooms"
    | "bathrooms";
  type: string;
  placeholder: string;
  value: string;
  onChange: (
    event: ChangeEvent<HTMLInputElement>
  ) => void;
  min?: string;
  required?: boolean;
}

function FormField({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  min,
  required = false,
}: FormFieldProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-semibold text-slate-700"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={min}
        required={required}
        className="h-12 w-full rounded-xl border border-slate-300 px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-teal-700 focus:ring-2 focus:ring-teal-100"
      />
    </div>
  );
}