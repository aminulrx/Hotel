import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

function useCreateCabin() {
    const queryClient = useQueryClient();
    const { mutate, isIdle } = useMutation({
      mutationFn: (nC) => createCabin(nC),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["cabin"],
        });
      },
      onError: (err) => toast.error(err.message),
    });
    return {mutate,isIdle}
}

export default useCreateCabin
