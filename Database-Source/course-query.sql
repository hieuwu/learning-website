-- Get latest course
select course.IdCourse FullName, nameCourse, course.Description,
course.nameCourse, category.NameCategory, course.Price, course.SaleCost, course.createdTime
from course 
left join user_profile
on course.IdTeacher = user_profile.IdUser
inner join category
on course.IdCategory = category.Id
order by IdCourse DESC limit 10;

-- Get most viewed
select course.IdCourse FullName, nameCourse, course.Description,
course.nameCourse, category.NameCategory, course.Price, course.SaleCost, course.createdTime, course.nOViews
from course 
left join user_profile
on course.IdTeacher = user_profile.IdUser
inner join category
on course.IdCategory = category.Id
order by course.nOViews DESC limit 10