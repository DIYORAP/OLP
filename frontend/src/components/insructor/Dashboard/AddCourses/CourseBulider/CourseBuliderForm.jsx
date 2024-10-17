import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import {
    setCourse,
    setEditCourse,
    setStep,
} from "@/redux/Slice/courseSlice.js";

import NestedView from "./NestedView";
import toast from "react-hot-toast";
import axios from "axios";

const CourseBuilderForm = () => {
    const { user } = useSelector((state) => state.user);
    const [editSectionName, setEditSectionName] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { course } = useSelector((state) => state.course);



    const createSection = async (data, token) => {
        let result = null;
        const toastId = toast.loading("Loading...");

        try {
            const response = await axios.post(
                '/api/courses/addSection', data,
                {

                    Authorization: `Bearer ${token}`,

                }
            );
            console.log("CREATE SECTION API RESPONSE............", response);

            if (!response?.data?.success) {
                throw new Error("Could Not Create Section");
            }

            toast.success("Course Section Created");
            result = response?.data?.updatedCourse;
            console.log("create API RESULT............", result);
        } catch (error) {
            console.log("CREATE SECTION API ERROR............", error);
            toast.error(error.message);
        }

        toast.dismiss(toastId);
        return result;
    };
    const updateSection = async (data, token) => {
        let result = null;
        const toastId = toast.loading("Loading...");

        try {
            const response = await axios.post(
                "/api/courses/updateSection", data,
                {

                    Authorization: `Bearer ${token}`,

                }
            );

            console.log("UPDATE SECTION API RESPONSE............", response);

            if (!response?.data?.success) {
                throw new Error("Could Not Update Section");
            }

            toast.success("Course Section Updated");
            result = response?.data?.updatedCourse;
            console.log("Update API RESULT............", result);
        } catch (error) {
            console.log("UPDATE SECTION API ERROR............", error);
            toast.error(error.message);
        }

        toast.dismiss(toastId);
        return result;
    };
    const gonext = () => {
        if (course.courseContent.length > 0) {
            if (
                course.courseContent.some((section) => section.SubSection.length > 0)
            ) {
                dispatch(setStep(3));
            } else {
                toast.error("Please add atleast one lesson to esch section");
            }
        } else {
            toast.error("Please add atleast one section to continue");
        }
    };

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        let result = null;
        setLoading(true);
        if (editSectionName) {
            result = await updateSection(
                {
                    sectionName: data.sectionName,
                    courseId: course._id,
                    sectionId: editSectionName,
                },
                user
            );
        } else {
            result = await createSection(
                {
                    sectionName: data.sectionName,
                    sectionId: editSectionName,
                    courseId: course._id,
                },
                user
            );
        }
        if (result) {
            dispatch(setCourse(result));
            setValue("sectionName", "");
            setEditSectionName(false);
        }
        setLoading(false);
    };


    const handelChangeEditSectionName = (sectionId, sectionName) => {
        if (editSectionName === sectionId) {
            setEditSectionName(false);
            setValue("sectionName", "");
            return;
        }
        setEditSectionName(sectionId);
        setValue("sectionName", sectionName);
    };

    return (
        <div className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
            <p className="text-2xl font-semibold text-richblack-5">Course Builder</p>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <label className="text-sm text-richblack-5" htmlFor="sectionName">
                    Section Name<sup className="text-red-700">*</sup>
                </label>
                <input
                    id="sectionName"
                    placeholder="Add a section to build your course"
                    name="sectionName"
                    className="form-style w-full"
                    {...register("sectionName", { required: true })}
                />
                {errors.sectionName && (
                    <p className="ml-2 text-xs tracking-wide text-red-700">This field is required</p>
                )}
                <div className="flex items-end gap-x-4">
                    <button
                        type="submit"
                        className="flex items-center border border-black bg-transparent cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-black undefined"
                    >
                        <span className="text-black">
                            {editSectionName ? "Edit Section Name" : "Create Section"}
                        </span>
                        <AiOutlinePlusCircle size={20} className="text-black" />
                    </button>
                    {editSectionName && (
                        <button
                            onClick={() => {
                                setEditSectionName(false);
                                setValue("sectionName", "");
                            }}
                            type="button"
                            className="text-sm text-richblack-300 underline"
                        >
                            Cancel Edit
                        </button>
                    )}
                </div>
            </form>
            <NestedView handelChangeEditSectionName={handelChangeEditSectionName} />
            <div className="flex justify-end gap-x-3">
                <button
                    onClick={() => {
                        dispatch(setEditCourse(true));
                        dispatch(setStep(1));
                    }}
                    className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900"
                >
                    Back
                </button>
                <button
                    onClick={gonext}
                    className="flex items-center bg-black cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-white undefined"
                >
                    <span className="false">Next</span>
                    <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 24 24"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default CourseBuilderForm;
