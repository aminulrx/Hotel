import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import useCreateCabin from "./useCreateCabin";

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;
const Label = styled.label`
  font-weight: 500;
`;
const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateCabinForm({ cabin = {}, setShowForm }) {
  const { id: editId, ...otherValues } = cabin;
  const isEdit = Boolean(editId);
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEdit ? otherValues : {},
  });
  const { errors } = formState;
  const queryClient = useQueryClient();
  const { mutate } = useCreateCabin();

  //todo for edit
  const { mutate: renameMutate } = useMutation({
    mutationFn: ({ newCabinData, id }) => createCabin(newCabinData, id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  function handleAnyName(data) {
    //! check url or not
    const image = typeof data.image === "string" ? data.image : data.image[0];

    //!todo edit
    if (isEdit) {
      renameMutate({ newCabinData: { ...data, image: image }, id: editId });
    } else {
      // mutate({ ...data, image: data.image[0] });
      mutate(
        { ...data, image: image },
        {
          onSuccess: () => {
            reset();
            setShowForm((bl) => !bl);
          },
        }
      );
    }
  }

  function handleError(errors) {
    //console.log(errors);
  }
  return (
    <Form onSubmit={handleSubmit(handleAnyName, handleError)}>
      <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <Input type="text" id="name" {...register("name")} />
      </FormRow>

      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input
          type="number"
          // defaultValue=""
          id="maxCapacity"
          {...register("maxCapacity")}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="regularPrice">Regular price</Label>
        <Input
          type="number"
          // defaultValue=""
          id="regularPrice"
          {...register("regularPrice")}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "this is a error message",
            min: {
              value: 50,
              message: "this is error message",
            },
            //own custom validation function
            validate: (vl) =>
              vl < getValues().regularPrice || "this is error message",
          })}
        />
        {errors?.discount?.message && <Error>{errors.discount.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description for website</Label>
        <Textarea
          type="number"
          id="description"
          // defaultValue=""
          {...register("description")}
        />
      </FormRow>
      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput
          id="image"
          // defaultValue=""
          accept="image/*"
          type="file"
          {...register("image", {
            required: isEdit ? false : "this is required field",
          })}
        />
      </FormRow>
      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          onClick={() => setShowForm((bl) => !bl)}
          variation="secondary"
          type="reset"
        >
          Cancel
        </Button>
        <Button>{isEdit ? "Edit cabin" : "Add cabin"}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
