import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { VscAdd, VscEdit } from 'react-icons/vsc';
import { VscTrash } from 'react-icons/vsc';
import { VscTriangleDown } from 'react-icons/vsc';
import { useState } from 'react';
import SubSectionModal from './SubsectionModal';
import { RxDropdownMenu } from 'react-icons/rx'
import ConfirmationModal from '@/components/common/ConfirmationModal';
import { setCourse } from '@/redux/Slice/courseSlice';
import axios from 'axios';
import toast from 'react-hot-toast';
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { RiDropdownList } from "react-icons/ri";


const NestedView = ({ handelChangeEditSectionName }) => {
    const { user } = useSelector(state => state.user);
    const { course } = useSelector(state => state.course);
    const dispatch = useDispatch();

    const [viewSubSection, setviewSubSection] = useState(null);
    const [addSubSection, setAddSubSection] = useState(null);
    const [editSubsection, setEditSubsection] = useState(null);


    const [confirmationModal, setConfirmationModal] = useState(null);




    const deleteSection = async (data, token) => {
        let result = null;
        const toastId = toast.loading("Loading...");
        try {
            const response = await axios.post("/api/courses/deleteSection", data, {
                Authorisation: `Bearer ${token}`,
            });
            console.log("DELETE SECTION API RESPONSE............", response);
            if (!response?.data?.success) {
                throw new Error("Could Not Delete Section");
            }
            toast.success("Course Section Deleted");
            result = response?.data?.updatedCourse;
            console.log("Delete API RESULT............", result);
        } catch (error) {
            console.log("DELETE SECTION API ERROR............", error);
            toast.error(error.message);
        }
        toast.dismiss(toastId);
        return result;
    };
    const deleteSubSection = async (data, token) => {
        let result = null;
        const toastId = toast.loading("Loading...");
        try {
            const response = await axios.post("/api/courses/deleteSection", data, {
                Authorisation: `Bearer ${token}`,
            });
            console.log("DELETE SUB-SECTION API RESPONSE............", response);
            if (!response?.data?.success) {
                throw new Error("Could Not Delete Lecture");
            }
            toast.success("Lecture Deleted");
            result = response?.data?.data;
            console.log("Delete subsection API RESULT............", result);
        } catch (error) {
            console.log("DELETE SUB-SECTION API ERROR............", error);
            toast.error(error.message);
        }
        toast.dismiss(toastId);
        return result;
    };







    const handeldeleteSection = async (sectionId) => {
        const result = await deleteSection({ sectionId, courseId: course._id }, user);
        if (result) {
            dispatch(setCourse(result));
            setConfirmationModal(null);
        }
    }

    const handeldeleteSubSection = async (subSectionId, sectionId) => {
        const result = await deleteSubSection({ subSectionId, courseId: course._id, sectionId }, user);
        if (result) {
            dispatch(setCourse(result));
            setConfirmationModal(null);
        }
    }

    const handelChangeEditSubSectionName = (subSectionId, subSection) => {
    }
    // console.log(course.courseContent);
    return (
        <div>
            <div>
                {
                    course.courseContent.map((section) => (
                        <details key={section._id} className='mt-4'>
                            <summary className='flex cursor-pointer items-center justify-between border-b-2 border-b-richblack-600 py-2'>
                                <div className='flex items-center gap-x-3'>
                                    <IoIosArrowDropdownCircle size={25} className=' text-black' />
                                    <p className='font-semibold text-black' >{section.sectionName}</p>
                                </div>
                                <div className='flex items-center gap-x-3'>
                                    <button>
                                        <VscEdit className='text-lg text-black ' onClick={() => {
                                            handelChangeEditSectionName(section._id, section.sectionName);
                                        }} />
                                    </button>
                                    <button>
                                        <VscTrash className='text-lg text-black' onClick={() => {
                                            setConfirmationModal({
                                                text1: "Delete this Section?",
                                                text2: "All the lectures in this section will be deleted",
                                                btn1Text: "Delete",
                                                btn2Text: "Cancel",
                                                btn1Handler: () => handeldeleteSection(section._id),
                                                btn2Handler: () => setConfirmationModal(null),
                                            })
                                        }} />
                                    </button>
                                    <span className="font-medium text-richblack-300">|</span>
                                    <VscTriangleDown className='text-lg text-black' />
                                </div>
                            </summary>

                            {<div className='px-6 pb-4'>
                                {
                                    section.SubSection.map((subSection) => (
                                        <div onClick={(e) => { if (e.currentTarget != e.target) return; setviewSubSection(subSection); }} key={subSection._id} className='flex cursor-pointer items-center justify-between gap-x-3 border-b-2 border-b-richblack-600 py-2 z-0'>
                                            <div className='flex items-center gap-x-3'>
                                                <RiDropdownList size={25} className=' text-black' />
                                                <p className='font-semibold text-black' >{subSection.title}</p>
                                            </div>
                                            <div className='flex items-center gap-x-3'>
                                                <button>
                                                    <VscEdit className='text-lg text-black z-50' onClick={
                                                        () => {
                                                            setEditSubsection(subSection);
                                                        }
                                                    } />
                                                </button>
                                                <button>
                                                    <VscTrash className='text-lg text-black z-50' size={21} onClick={() => {
                                                        setConfirmationModal({
                                                            text1: "Delete this Sub-Section?",
                                                            text2: "Selected lecture will be deleted",
                                                            btn1Text: "Delete",
                                                            btn2Text: "Cancel",
                                                            btn1Handler: () => handeldeleteSubSection(subSection._id, section._id),
                                                            btn2Handler: () => setConfirmationModal(null),
                                                        })
                                                    }} />
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                }
                                <button onClick={() => setAddSubSection(section._id)} className='mt-3 flex items-center gap-x-1 text-black font-bold'>
                                    <VscAdd className='text-lg text-black ' />
                                    <p>Add Lecture</p>
                                </button>
                            </div>}

                        </details>
                    ))
                }
            </div>
            {
                addSubSection ? <SubSectionModal modalData={addSubSection} setModalData={setAddSubSection} add={true} /> :
                    editSubsection ? <SubSectionModal modalData={editSubsection} setModalData={setEditSubsection} edit={true} /> :
                        viewSubSection ? <SubSectionModal modalData={viewSubSection} setModalData={setviewSubSection} view={true} /> : null
            }
            {
                confirmationModal ? <ConfirmationModal modalData={confirmationModal} setConfirmationModal={setConfirmationModal} /> : null
            }
        </div>
    )
}

export default NestedView