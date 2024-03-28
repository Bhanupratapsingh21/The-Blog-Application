import React, { useCallback } from "react";
import { useForm } from 'react-hook-form'
import { Button, Input, Select, RTE } from '../index'
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useToast } from "@chakra-ui/react";
import service from "../../Appwrite/config";

function Postform({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            tittle: post?.tittle || "",
            slug: post?.slug || "",
            Content: post?.Content || "",
            status: post?.status || "active",
        },
    })
    const navigate = useNavigate()
    const userdata = useSelector(state => state.auth.userData)
    console.log(userdata)
    const toast = useToast()
    const Submit = async (data) => {
        if (post) {
            toast({
                title : 'Updateing Your Blog',
                status : "loading",
                position : "top",
                duration : 1000,
                isClosable : true 
            });
            const file = data.image[0] ? await service.uploadfile(data.image[0]) : null
            
            if (file) {
                service.deletefile(post.featuredImage)
            }
            const dbpost = await service.updatepost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined
            })
            if (dbpost) {
                toast({
                    title : 'Updated SuccesFully',
                    status : "success",
                    position : "top",
                    duration : 1000,
                    isClosable : true 
                });
                navigate(`/post/${dbpost.$id}`)
            }
        } else {
            toast({
                title : 'Posting Your Blog',
                status : "loading",
                position : "top",
                duration : 1000,
                isClosable : true 
            });
            const file = await service.uploadfile(data.image[0])
            // todo apply conditions like line no 30
            if (file) {
                const fileid = file.$id
                data.featuredImage = fileid
                const data2 = { ...data, userid: userdata.$id }
                const dbpost = await service.createPost(data2)
                if (dbpost) {
                    toast({
                        title : 'Posted SuccesFully',
                        status : "success",
                        position : "top",
                        duration : 1000,
                        isClosable : true 
                    });
                    navigate(`/post/${dbpost.$id}`)
                }
            }
        }
    }


    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/^[a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-")

        return ""
    }, [])
    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "tittle") {
                setValue('slug', slugTransform(value.tittle,
                    { shouldValidate: true }))
            }
        })
        return () => subscription.unsubscribe()
    }, [watch, slugTransform, setValue])

    return (
        <form onSubmit={handleSubmit(Submit)} className="flex  flex-col justify-center">
            <div className=" px-2">
                <Input
                    labal="Tittle"
                    placeholder="Tittle"
                    className="mb-4"
                    {...register("tittle", { required: true })}
                />
                <Input
                    labal="Slug"
                    placeholder="Slug"
                    className="mb-7 w-full"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="Content" control={control} defaultValue={getValues("Content")} />
            </div>
            <div className="w-1/9 mt-5 px-2">
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={service.getfilepreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Input
                    labal="Upload Image (Required)"
                    type="file"
                    className="mb-5"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                <Select
                    options={["active", "inactive"]}
                    label="Status : ( Visible For Other )"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    )
}

export default Postform