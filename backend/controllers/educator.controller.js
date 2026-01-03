import {clerkClient} from '@clerk/express'
import { Course } from '../models/course.model.js'
import {v2 as Cloudinary} from 'cloudinary'
import { Purchase } from '../models/purchase.model.js'


export const updateRoleToEducator = async (req,res)=>{
    try {
        const userId = req.auth.userId

        await clerkClient.users.updateUserMetadata(userId,{
            publicMetadata:{
                role : "educator",
            }
        })

        res.json({success: true , message : 'You can publish a course now'})
    } catch (error) {
        res.json({success:false , message : error.message})
    }
}


// Add New Course

export const addcourse = async (req,res) => {
    try {
        const {courseData} = req.body;
        const imageFile = req.file;
        const educatorId = req.auth.userId;
        
       if(!imageFile){
        return res.json({success:false , message : "Thumbnail not attached...!!"})
       }

       const parsedCourseData = await JSON.parse(courseData)
       parsedCourseData.educator = educatorId;
       const newCourse = await Course.create(parsedCourseData)
       const imageUpload = await Cloudinary.uploader.upload(imageFile.path)
       newCourse.courseThumbnail = imageUpload.secure_url
       await newCourse.save();



  res.json({success: true , message: 'Course Added'})


    } catch (error) {
        res.json({success:false , message : error.message})
    }
}


// Get Educator Courses

export const getEducatorCourses = async (req,res)=>{
   try {
    const educator = req.auth.userId;

    const courses = await Course.find({educator})

    res.json({success : true , courses , message: "ALL Courses Fetch Successfully...!!!"})

   } catch (error) {
    res.json({success:false , message : error.message})
   }
} 


//Get Educator Dashboard data (Total Earning , Enrolled Student , No. Of Courses)

export const educatorDashboardData = async (req, res) => {
  try {
    // 1. Get logged-in educator ID from auth middleware
    const educator = req.auth.userId;

    // 2. Fetch all courses created by this educator
    const courses = await Course.find({ educator });

    // 3. Count total number of courses
    const totalCourses = courses.length;

    // 4. Extract course IDs (used for purchase lookup)
    const courseIds = courses.map(course => course._id);

    // 5. Find all completed purchases for educator's courses
    const purchases = await Purchase.find({
      courseId: { $in: courseIds }, // match educator's course IDs
      status: 'completed'           // only completed payments
    });

    // 6. Calculate total earnings from all purchases
    const totalEarnings = purchases.reduce(
      (sum, purchase) => sum + purchase.amount,
      0
    );

    // 7. Prepare array to store enrolled students data
    const enrolledStudentsData = [];

    // 8. Loop through each course
    for (const course of courses) {

      // 9. Fetch students enrolled in the course
      const students = await User.find(
        { _id: { $in: course.enrolledStudents } },
        'name imageUrl' // only fetch required fields
      );

      // 10. Attach course title with each student
      students.forEach(student => {
        enrolledStudentsData.push({
          courseTitle: course.courseTitle,
          student
        });
      });
    }

    // 11. Send dashboard data response
    res.json({
      success: true,
      dashboardData: {
        totalEarnings,
        enrolledStudentsData,
        totalCourses
      }
    });

  } catch (error) {
    // 12. Handle errors gracefully
    res.json({ success: false, message: error.message });
  }
};


// Get Enrolled Students Data with Purchase Data
export const getEnrolledStudentsData = async (req,res)=>{
    try {
        const educator = req.auth.userId;

        const courses = await Course.find({educator})

         const courseIds = courses.map(course => course._id);

         const purchases = await Purchase.find({
            courseId: {$in : courseIds},
            status: 'completed'
         }).populate('userId', 'name imageUrl').populate('courseId','courseTitle')

        const enrolledStudents = purchases.map(purchase =>({
            student: purchase.userId,
            courseTitle: purchase.courseId.courseTitle,
            purchaseDate: purchase.createdAt
        })) 

        res.json ({success: true , enrolledStudents})
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}