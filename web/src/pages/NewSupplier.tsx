import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSupplier } from "../api";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Enter a valid email"),
});
type FormData = z.infer<typeof schema>;

export function NewSupplier() {
  const nav = useNavigate();
  const qc = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const create = useMutation({
    mutationFn: createSupplier,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["suppliers"] });
      nav("/suppliers");
    },
  });

  return (
    <form onSubmit={handleSubmit((d) => create.mutate(d))}>
      <label>
        Name
        <input {...register("name")} />
      </label>
      {errors.name && <small>{errors.name.message}</small>}

      <label>
        Email
        <input {...register("email")} />
      </label>
      {errors.email && <small>{errors.email.message}</small>}

      <button type="submit" disabled={create.isPending}>
        Create
      </button>
    </form>
  );
}