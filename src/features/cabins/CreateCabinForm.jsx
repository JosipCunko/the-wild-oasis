import { useForm } from "react-hook-form";

import { useCreateCabin } from "./useCreateCabin";
import { useUpdateCabin } from "./useUpdateCabin";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

/*eslint-disable no-unused-vars*/
/*eslint-disable react/prop-types */
/**@param cabinToUpdate cabin object to update */
function CreateCabinForm({ cabinToUpdate = {}, onCloseModal }) {
  const { id: updateId, ...updateValues } = cabinToUpdate;
  const isUpdatingCabin = Boolean(updateId);

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    //same as the errors argument in "onError"
    formState: { errors },
  } = useForm({
    defaultValues: isUpdatingCabin ? updateValues : {},
    mode: "all",
  });

  const { createCabin, isCreating } = useCreateCabin();
  const { updateCabin, isUpdating } = useUpdateCabin();

  const isWorking = isUpdating || isCreating;

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isUpdatingCabin)
      updateCabin(
        { newCabinData: { ...data, image }, id: updateId },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      createCabin(
        { ...data, image: image },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        }
      );
  }
  function onError(errors) {
    console.error(errors);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          //register first arg same as the id
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Price should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isWorking}
          {...register("discount", {
            required: "This field is required",

            //validators - current input value
            // validate: (value) =>
            //   getValues().regularPrice >= value ||
            //   "Discount should be less than the regular price",

            validate: (value) =>
              value <= getValues().regularPrice ||
              //This error message gets put in errors object
              "Discount must be less than the regular price",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="text"
          id="description"
          defaultValue=""
          disabled={isWorking}
          {...register("description", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        {/*returns a FileList => take first element inside*/}
        <FileInput
          id="image"
          accept="image/*"
          disabled={isWorking}
          {...register("image", {
            required: isUpdatingCabin ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()} //If it undefined, function wont get called, reusability usecase
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isUpdatingCabin ? "Update cabin" : "Create new cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
