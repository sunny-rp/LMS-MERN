import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";
import {useAuth , useUser} from '@clerk/clerk-react'

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

  const currency = import.meta.env.VITE_CURRENCY || '$';
  const navigate = useNavigate()

  const {getToken} = useAuth()
  const {user} = useUser()

  const [allcourses, setAllCourses] = useState([]);
  const [isEducator, setIsEducator] = useState(true);
  const [enrolledCourses, setEnrolledCourses] = useState([]);


  //Fetch all courses
  const fetchAllCourses = async () => {
    setAllCourses(dummyCourses)
  }

  //Calculate average rating for a course
  const calculateRating = (course) => {
    if (course.courseRatings.length === 0) return 0;
    let totalRating = 0;
    course.courseRatings.forEach(rating => {
      totalRating += rating.rating;
    })
    return totalRating / course.courseRatings.length;
  }

  // function to Calculate Course Chapter Time
    const calculateChapterTime = (chapter) => {
      let time =0;
      chapter.chapterContent.map((lecture)=> time += lecture.lectureDuration);
      return humanizeDuration(time * 60 * 1000, { units: ['h', 'm']});
    }

    //Function to Calculate Course Duration
   const calculateCourseDuration = (course) => {
      let time =0;

      course.courseContent.map((chapter)=> chapter.chapterContent.map((lecture)=> time += lecture.lectureDuration));
      return humanizeDuration(time * 60 * 1000, { units: ['h', 'm']});
   }

   //Function to Calculate Total Lectures in a Course
    const calculateNoOfLectures = (course) => {
      let totalLectures = 0;
      course.courseContent.forEach(chapter => {
        if(Array.isArray(chapter.chapterContent)){
          totalLectures += chapter.chapterContent.length;
        }
      })

      return totalLectures
    }

    // Fetch User Enrolled Courses
    const fetchUserEnrolledCourses = async () => {
      // Dummy Implementation
      setEnrolledCourses(dummyCourses);
    }


  useEffect(() => {
    fetchAllCourses();
    fetchUserEnrolledCourses();
  }, []);

  const logToken = async () => {
    console.log(await getToken());
    
  }

  useEffect(()=>{
   if(user){
    logToken()
   }
  },[user])

  const value = {
    // Define any shared state or functions here
    currency, allcourses, navigate, calculateRating ,isEducator, setIsEducator ,calculateChapterTime, calculateCourseDuration, calculateNoOfLectures , enrolledCourses , fetchUserEnrolledCourses
  };
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}