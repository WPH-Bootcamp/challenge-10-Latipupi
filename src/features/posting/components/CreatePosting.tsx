"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { UploadCloud, Bold, Italic,  Type } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useCreatePosting } from "../hooks/hook"
import { toast } from "sonner"

const formSchema = z.object({
    title: z.string().min(5, "Judul minimal 5 karakter"),
    content: z.string().min(20, "Konten minimal 20 karakter"),
    tags: z.array(z.string()).min(1, "Pilih minimal satu tag"),
    image: z.any().refine((file) => file instanceof File, "Cover image wajib diisi"),
})

export function CreatePostingForm() {
    const { mutate, isPending } = useCreatePosting();
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            content: "",
            tags: [],
            image: undefined // Inisialisasi dengan undefined untuk File
        },
    })

    function onSubmit(data: z.infer<typeof formSchema>) {
        mutate(data, {
            onSuccess: () => {
                toast.success("Posting created successfully!");
                form.reset();
            },
            onError: (err: any) => {
                // Menampilkan pesan error spesifik dari server jika ada
                const errMsg = err.response?.data?.message || "Create Posting failed";
                toast.error(errMsg);
            },
        });
    }

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                    {/* Title Field */}
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-gray-700 font-semibold">Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your title" className="py-6" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Content Field */}
                    <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-gray-700 font-semibold">Content</FormLabel>
                                <div className="border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-sky-500 transition-all">
                                    <div className="bg-gray-50 p-2 border-b flex items-center gap-3 flex-wrap text-gray-400">
                                       {/* Toolbar Mockup */}
                                       <Type size={18} />
                                       <Bold size={18} />
                                       <Italic size={18} />
                                    </div>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Enter your content"
                                            className="border-none focus-visible:ring-0 min-h-[250px] resize-none p-4"
                                            {...field}
                                        />
                                    </FormControl>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Cover Image Upload Area */}
                    <div className="space-y-3">
                        <FormLabel className="text-gray-700 font-semibold">Cover Image</FormLabel>
                        <div
                            className="border-2 border-dashed border-gray-300 rounded-xl p-12 flex flex-col items-center justify-center bg-gray-50/50 hover:bg-gray-100 transition-colors cursor-pointer"
                            onClick={() => document.getElementById('fileInput')?.click()}
                        >
                            <div className="bg-white p-3 rounded-full shadow-sm mb-4">
                                <UploadCloud className="w-8 h-8 text-sky-500" />
                            </div>
                            <p className="text-sm text-gray-600">
                                {form.watch("image") ? (
                                    <span className="text-green-600 font-bold">
                                        File selected: {form.watch("image").name}
                                    </span>
                                ) : (
                                    <>
                                        <span className="text-sky-500 font-bold">Click to upload</span> or drag and drop
                                    </>
                                )}
                            </p>
                            <input
                                type="file"
                                id="fileInput"
                                className="hidden"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        form.setValue("image", file, { shouldValidate: true });
                                    }
                                }}
                            />
                        </div>
                        {/* Menampilkan pesan error khusus image */}
                        {form.formState.errors.image && (
                            <p className="text-sm font-medium text-destructive">
                                {form.formState.errors.image.message?.toString()}
                            </p>
                        )}
                    </div>

                    {/* Tags Field */}
                    <FormField
                        control={form.control}
                        name="tags"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-bold">Tags</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter your tags (pisahkan dengan koma)"
                                        value={Array.isArray(field.value) ? field.value.join(", ") : ""}
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            // Pecah jadi array, pertahankan spasi di tengah kata
                                            const arrayTags = val.split(",").map(tag => tag.trimStart());
                                            field.onChange(arrayTags);
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex justify-end pt-4">
                        <Button
                            disabled={isPending}
                            type="submit"
                            className="bg-[#009ee2] hover:bg-[#008cc9] text-white px-12 py-6 rounded-full text-lg font-medium transition-transform active:scale-95"
                        >
                            {isPending ? "Submitting..." : "Finish"}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}