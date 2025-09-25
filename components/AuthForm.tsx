"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Form } from "@/components/ui/form"
import FormField from "@/components/FormField"
import { useRouter } from "next/navigation"
// ✅ define the prop type
type FormType = "sign-in" | "sign-up"

const AuthFormSchema = (type: FormType) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(6),
  })
}

const AuthForm = ({ type }: { type: FormType }) => {
  const formSchema = AuthFormSchema(type)
  const router=useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  const isSignIn = type === "signin"

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (type === "sign-up") {
        toast.success("Account created successfully!. Please sign in.");  
        router.push('/sign-in');
      } else {
        toast.success("Signed in successfully!");
        router.push('/');
      }
    } catch (error) {
      console.log(error)
      toast.error(`There was an error. ${error}`)
    }
  }

  return (
    <div className="card-border ig:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src="/logo.svg" alt="logo" width={38} height={32} />
          <h2 className="text-primary-100">HireAI</h2>
        </div>
        <h3>Practice Job Interview with AI</h3>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4">
            {!isSignIn && (
              <FormField
                control={form.control}
                name="name"
                label="Name"
                placeholder="Your Name"
                description="This is your public display name."
              />
            )}

            <FormField
              control={form.control}
              name="email"
              label="Email"
              placeholder="your email address"
              type="email"
            />

            <FormField
              control={form.control}
              name="password"
              label="Password"
              placeholder="••••••"
              type="password"
            />
<Button
  type="submit"
  className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200"
>
  {isSignIn ? "Sign In" : "Create an Account"}
</Button>

          </form>
        </Form>

        <p className="text-center">
          {isSignIn ? "No account yet" : "Have an account already"}
          <Link
            href={!isSignIn ? "/sign-in" : "/sign-up"}
            className="font-bold text-user-primary ml-1"
          >
            {!isSignIn ? "Sign In" : "Sign Up"}
          </Link>
        </p>
      </div>
    </div>
  )
}

export default AuthForm
