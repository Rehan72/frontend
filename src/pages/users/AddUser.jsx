import { LoaderCircle, MapPin, UploadIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import AdjustLocation from "../../components/AdjustLocation";
import ImageUploader from "../../components/ImageUploader";
import {
   Breadcrumb,
   BreadcrumbItem,
   BreadcrumbLink,
   BreadcrumbList,
   BreadcrumbPage,
   BreadcrumbSeparator,
} from "../../components/ui/breadcrumb";
import { Button } from "../../components/ui/button";
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "../../components/ui/card";
import { Dialog, DialogContent } from "../../components/ui/dialog";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { getLiveLocation } from "../../lib/geoUtils";
import { showToast } from "../../Utils";
function AddUser() {
  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPending, setIsPending] = useState();
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isDialogOpenForImage, setIsDialogOpenForImage] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [date, setDate] = useState();
  let userId = "";

  const form = useForm({
    // resolver: zodResolver(formSchema),
    defaultValues: {
      Firstname: "",
      Lastname: "",
      email: "",
      PhoneNumber: "",
      Addressline1: "",
      Addressline2: "",
      country: "",
      state: "",
    },
  });
  const {
    reset,
    handleSubmit,
    register,
    setValue,
    getValues,
    formState: { errors },
  } = form;

  // Fetch live location when the component mounts
  useEffect(() => {
    getLiveLocation()
      .then((loc) => setLocation(loc))
      .catch((error) => showToast("error", error));
  }, []);

  function onSubmit(values) {
    const formData = new FormData();

    // Append location data if available

    // Log or send the formData as needed
    // console.log("Form Submission Data:", Object.fromEntries(formData.entries()));
    try {
      formData.append("Firstname", values.Firstname);
      formData.append("Lastname", values.Lastname);
      formData.append("email", values.email);
      formData.append("PhoneNumber", values.PhoneNumber);
      formData.append("Addressline1", values.Addressline1);
      formData.append("Addressline2", values.Addressline2);
      formData.append("country", values.country);
      formData.append("state", values.state);

      setIsPending(true);

      // Simulate an API call (replace with actual API logic)
      setTimeout(() => {
        if (location.lat && location.lng) {
          formData.append("latitude", location.lat);
          formData.append("longitude", location.lng);
        } else {
          showToast("error", "Location not available. Please try again.");
          return; // Prevent submission if location is missing
        }
        showToast("success", "User created Successful.");
        setIsPending(false);
        navigate("/user");
      }, 2000);
    } catch (error) {
      showToast("error", error);
    }
  }

  useEffect(() => {
    // Sample static data for countries and states
    const countryData = [
      { id: "US", name: "United States" },
      { id: "IN", name: "India" },
    ];
    setCountries(countryData);
  }, []);

  useEffect(() => {
    // Dynamically load states based on selected country
    if (selectedCountry === "US") {
      setStates([
        { id: "NY", name: "New York" },
        { id: "CA", name: "California" },
      ]);
    } else if (selectedCountry === "IN") {
      setStates([
        { id: "DL", name: "Delhi" },
        { id: "KA", name: "Karnataka" },
      ]);
    } else {
      setStates([]);
    }
  }, [selectedCountry]);

  // Handle state selection and show a toast if no country is selected
  const handleStateChange = (e, field) => {
    if (!selectedCountry) {
      showToast("error", "Please select a country first");
      //toast.error();
      e.preventDefault(); // Prevent the state change if no country is selected
      return;
    }
    setSelectedState(e.target.value);
    field.onChange(e); // Update React Hook Form if country is selected
  };

  const openDialog = () => {
    setIsDialogOpen(true);

    // if (!location.lat || !location.lon) {
    //    showToast("error",'Unable to fetch live location');
    //   return;
    // }
  };
  const openDialogForIamge = () => {
    setIsDialogOpenForImage(true);
  };

  const handleLocationChange = (newLocation) => {
    setLocation(newLocation);
    console.log("Updated Location:", newLocation);
    // Handle updated location in state or API calls
  };

  const handleImageUpload = (image) => {
    setUploadedImage(image); // Update the parent state with the uploaded image
    console.log("Uploaded Image:", image);
  };

  const handlePreviewImage = () => {
    setIsLightboxOpen(true);
    return (
      <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
        <DialogContent className="p-6 flex justify-center items-center">
          <img
            src={uploadedImage?.preview}
            alt="Full Preview"
            className="max-w-full max-h-screen rounded shadow-lg"
          />
        </DialogContent>
      </Dialog>
    );
  };
  return (
    <section>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="p-2 bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text">
            <div className="flex items-center justify-between">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/user">User</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Create User</BreadcrumbPage>
                    {/* <BreadcrumbLink href="/dashboard/books">Create user</BreadcrumbLink> */}
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    {/* <BreadcrumbPage>{!bookId ? "Create" : "Update"}</BreadcrumbPage> */}
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
              <div className="flex items-center gap-4">
                <Link to="/user">
                  <Button variant={"outline"}>
                    <span className="ml-2">Cancel</span>
                  </Button>
                </Link>

                <Button type="submit" disabled={isPending}>
                  {isPending && <LoaderCircle className="animate-spin" />}
                  <span className="ml-2">Submit</span>
                </Button>
              </div>
            </div>
          </div>
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>
                {!userId ? "Create a new user" : "Edit user"}
              </CardTitle>
              <CardDescription>
                Fill out the below to {!userId ? "create" : "update"} a user
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <FormField
                  control={form.control}
                  name="Firstname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:ring-primary-500"
                          {...field}
                          //   {...register("Firstname", {
                          //     required: "First Name is required",
                          //   })}
                        />
                      </FormControl>
                      <FormMessage>
                        {errors.Firstname && errors.Firstname.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="Lastname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:ring-primary-500"
                          {...field}
                          {...register("Lastname", {
                            required: "Last Name is required",
                          })}
                        />
                      </FormControl>
                      <FormMessage>
                        {errors.Lastname && errors.Lastname.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:ring-primary-500"
                          {...field}
                          {...register("email", {
                            required: "Email is required",
                          })}
                        />
                      </FormControl>
                      <FormMessage>
                        {errors.email && errors.email.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="PhoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:ring-primary-500"
                          {...field}
                          {...register("PhoneNumber", {
                            required: "Phone Number is required",
                          })}
                        />
                      </FormControl>
                      <FormMessage>
                        {errors.PhoneNumber && errors.PhoneNumber.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
                <h3 className="text-xl font-semibold col-span-4 mt-6">
                  Address Information
                </h3>
                <FormField
                  control={form.control}
                  name="Addressline1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address Line 1</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:ring-primary-500"
                          {...field}
                          {...register("Addressline1", {
                            required: "Address line 1 is required",
                          })}
                        />
                      </FormControl>
                      <FormMessage>
                        {errors.Addressline1 && errors.Addressline1.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="Addressline2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address Line 2</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:ring-primary-500"
                          {...field}
                          //   {...register("Addressline1", {
                          //     required: "Address line 1 is required",
                          //   })}
                        />
                      </FormControl>
                      {/* <FormMessage>
                        {errors.Addressline1 && errors.Addressline1.message}
                      </FormMessage> */}
                    </FormItem>
                  )}
                />
                {/* Country Dropdown */}
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <select
                          {...field}
                          onChange={(e) => {
                            setSelectedCountry(e.target.value);
                            field.onChange(e); // Update React Hook Form
                          }}
                          className="w-full p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:ring-primary-500"
                        >
                          <option value="">Select a Country</option>
                          {countries.map((country) => (
                            <option key={country.id} value={country.id}>
                              {country.name}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                      <FormMessage>
                        {errors.country && errors.country.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />

                {/* State Dropdown */}
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <select
                          {...field}
                          onClick={(e) => handleStateChange(e, field)}
                          className="w-full p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:ring-primary-500"
                          //disabled={!selectedCountry}
                        >
                          <option value="">Select a State</option>
                          {states.map((state) => (
                            <option key={state.id} value={state.id}>
                              {state.name}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                      <FormMessage>
                        {errors.state && errors.state.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="City"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:ring-primary-500"
                          {...field}
                          {...register("City", {
                            required: "City is required",
                          })}
                        />
                      </FormControl>
                      <FormMessage>
                        {errors.city && errors.city.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="postalcode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Postal Code</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:ring-primary-500"
                          {...field}
                          {...register("postalcode", {
                            required: "Postal Code is required",
                          })}
                        />
                      </FormControl>
                      <FormMessage>
                        {errors.postalcode && errors.postalcode.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
                {/* <DatePickerDemo /> */}
                <h3 className="text-xl font-semibold col-span-4 mt-6">
                  Upload Image
                </h3>
                <Card className="bg-light-background dark:bg-dark-background p-4 flex items-center space-x-4">
                  {/* <div className="flex items-center space-x-4">
                    <Upload className="w-6 h-6 text-primary" />
                    <div className="flex flex-col ">
                      <span className="text-lg">Image</span>
                      
                    </div>
                    <Button type="button" onClick={openDialogForIamge}>
                      Upload
                    </Button>
                  </div> */}
                  <Button
                    type="button"
                    onClick={openDialogForIamge}
                    className="flex items-center space-x-8"
                  >
                    <UploadIcon className="w-5 h-5" />
                    <span>Upload Image</span>
                  </Button>
                  {uploadedImage && (
                    <div className="mt-4" onClick={handlePreviewImage}>
                      <h3>Uploaded Image:</h3>
                      <img
                        src={uploadedImage.preview}
                        alt="Uploaded"
                        className="w-32 h-32 object-cover"
                      />
                    </div>
                  )}
                </Card>

                <h3 className="text-xl font-semibold col-span-4 mt-6">
                  Location detials
                </h3>
                <Card className="bg-light-background dark:bg-dark-background p-4">
                  <div className="flex items-center space-x-6">
                    <MapPin className="w-6 h-6 text-primary" />
                    <div className="flex flex-col">
                      <span className="text-lg">Location</span>
                      <p className="text-sm">
                        {location.lat && location.lng
                          ? `Lat: ${location.lat}, Lng: ${location.lng}`
                          : "Fetching location..."}
                      </p>
                    </div>
                    <Button type="button" onClick={openDialog}>
                      Adjust Location
                    </Button>
                  </div>
                </Card>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>

      {/* Dialog for Adjusting Location */}
      {isDialogOpen ? (
        <AdjustLocation
          initialLocation={location}
          onLocationChange={handleLocationChange}
          showDialog={isDialogOpen}
          setShowDialog={setIsDialogOpen}
        />
      ) : (
        ""
      )}
      {isDialogOpenForImage ? (
        <ImageUploader
          onImageChange={handleImageUpload}
          showDialog={isDialogOpenForImage}
          setShowDialog={setIsDialogOpenForImage}
        />
      ) : (
        ""
      )}
      {/* Lightbox Modal for Full Image */}
      <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
        <DialogContent className="p-4 flex justify-center items-center">
          <img
            src={uploadedImage?.preview}
            alt="Full Preview"
            className="max-w-full max-h-screen rounded shadow-lg"
          />
        </DialogContent>
      </Dialog>
    </section>
  );
}

export default AddUser;
