import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getSettings, updateSetting } from "../../services/apiSettings";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import toast from "react-hot-toast";

function UpdateSettingsForm() {
  const { data: setting = {} } = useQuery({
    queryKey: ["settings"],
    // queryFn: fetch('http//www.anyapi...'),
    queryFn: getSettings,
  });
  const {
    minBookingLength,
    maxBookingLength,
    maxGuestsPerBooking,
    breakfastPrice,
  } = setting;

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (newSetting) => updateSetting(newSetting),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  function handleUpadate(e, fieldName) {
    const { value } = e.target;
    if (!value) return;
    mutate({ [fieldName]: value });
    //console.log({ [fieldName]: value });
  }
  return (
    <form>
      <FormRow label="Minimum nights/booking">
        <Input
          defaultValue={minBookingLength}
          // onBlur trigger when mouse leave the input field
          // second argument name of the field that should be updated
          onBlur={(e) => handleUpadate(e, "minBookingLength")}
          type="number"
          id="min-nights"
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          defaultValue={maxBookingLength}
          onBlur={(e) => handleUpadate(e, "maxBookingLength")}
          type="number"
          id="max-nights"
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          defaultValue={maxGuestsPerBooking}
          onBlur={(e) => handleUpadate(e, "maxGuestsPerBooking")}
          type="number"
          id="max-guests"
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          defaultValue={breakfastPrice}
          onBlur={(e) => handleUpadate(e, "breakfastPrice")}
          type="number"
          id="breakfast-price"
        />
      </FormRow>
    </form>
  );
}

export default UpdateSettingsForm;
