drop database if exists `websiteDB`;
create database `websiteDB`;
use `websiteDB`;

DROP TABLE IF EXISTS `HeaderCategory`;
create table `HeaderCategory`(
	Id int unsigned auto_increment primary key,
    NameCategory varchar(100) NOT NULL
)ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
DROP TABLE IF EXISTS `User_profile`;
create table `User_profile`(
IdUser int unsigned auto_increment primary key,
FullName varchar(100),
Email text,
isTeacher int unsigned default 1,/*Valid 1= not teacher, 2;teacher*/
Permission varchar(100) default "student",
UserName varchar(50) not null,
`password` varchar(225) not null,
createdTime datetime not null default now(),
updatedTime datetime not null default now()
)ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
DROP TABLE IF EXISTS `Category`;
create table `Category`(
	Id int unsigned auto_increment primary key,
    HeaderCategoryID int unsigned not null,
    NameCategory varchar(50) not null,
    CONSTRAINT FK_FromCategory FOREIGN KEY (HeaderCategoryID)
    REFERENCES HeaderCategory(Id)
)ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
DROP TABLE IF EXISTS `course`;
create table `course`(
	IdCourse int unsigned auto_increment primary key,
    nameCourse varchar(100) not null,
    title varchar(100) not null,
    Description text not null,
    Price float unsigned not null,
    SaleCost float unsigned default '0.00',
    nOViews int unsigned default '0',
    status varchar(50) default "unfinished",/*has change to finished*/
    IdCategory int unsigned not null,
    IdTeacher int unsigned not null,
    createdTime datetime not null default now(),
    updatedTime datetime not null default now(),
    CONSTRAINT FK_Category FOREIGN KEY (IdCategory)
    REFERENCES Category(Id),
    CONSTRAINT FK_Teacher FOREIGN KEY (IdTeacher)
    REFERENCES User_profile(IdUser)
)ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DROP TABLE IF EXISTS `Teach_profile`;
create table `Teach_profile`(
    IdUser int unsigned not null primary key,
    Biography text not null,
    status varchar(20) default "Processing",/*has change to "Accept"*/
    CONSTRAINT FK_UserisTeacher FOREIGN KEY (IdUser)
    REFERENCES User_profile(IdUser)
)ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
DROP TABLE IF EXISTS `WatchList`;
create table `WatchList`(
	Id int unsigned auto_increment primary key,
    IdUser int unsigned not null,
    IdCourse int unsigned not null,
    CONSTRAINT FK_WatchListUser FOREIGN KEY (IdUser)
    REFERENCES User_profile(IdUser),
    CONSTRAINT FK_WatchListCourse FOREIGN KEY (IdCourse)
    REFERENCES course(IdCourse)
)ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
DROP TABLE IF EXISTS `EnrolledCourse`;
create table `EnrolledCourse`(
	Id int unsigned auto_increment primary key,
    IdUser int unsigned not null,
    IdCourse int unsigned not null,
    EnrollDate datetime not null,
    rateStar int unsigned,
    Comments text,
    status varchar(50) default "unfinished",/*has change to finished*/
    CONSTRAINT FK_UserEnroll FOREIGN KEY (IdUser)
    REFERENCES User_profile(IdUser),
    CONSTRAINT FK_EnrolledCourse FOREIGN KEY (IdCourse)
    REFERENCES course(IdCourse)
)ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
DROP TABLE IF EXISTS `Chapter`;
create table `Chapter`(
	IdChapter int unsigned auto_increment primary key,
    NameChapter varchar(50) not null,
    idCourse int unsigned not null,
    CONSTRAINT FK_ChapterCourse FOREIGN KEY (IdCourse)
    REFERENCES course(IdCourse)
)ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
DROP TABLE IF EXISTS `Lesson`;
create table `Lesson`(
	idLesson int unsigned auto_increment primary key,
    NameLesson varchar(100) not null,
    Video text not null,
    idChapter int unsigned not null,
    CONSTRAINT FK_ChapterLesson FOREIGN KEY (IdChapter)
    REFERENCES Chapter(IdChapter)
)ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*---------Data Demo*/
insert into HeaderCategory(HeaderNameCategory) values('Development');
insert into HeaderCategory(HeaderNameCategory) values('Business');
insert into HeaderCategory(HeaderNameCategory) values('Finance & Accounting');
insert into HeaderCategory(HeaderNameCategory) values('IT & Software');
insert into HeaderCategory(HeaderNameCategory) values('Music');

insert into Category(NameCategory,HeaderCategoryID) values('Web Development',1);
insert into Category(NameCategory,HeaderCategoryID) values('Mobile Development',1);
insert into Category(NameCategory,HeaderCategoryID) values('Game Development',1);
insert into Category(NameCategory,HeaderCategoryID) values('Programming Languages',1);

insert into Category(NameCategory,HeaderCategoryID) values('Management',2);
insert into Category(NameCategory,HeaderCategoryID) values('Sales',2);
insert into Category(NameCategory,HeaderCategoryID) values('Accounting & Bookkeeping',3);
insert into Category(NameCategory,HeaderCategoryID) values('Finance',3);
insert into Category(NameCategory,HeaderCategoryID) values('Investing & Trading',3);
insert into Category(NameCategory,HeaderCategoryID) values('IT Certification',4);
insert into Category(NameCategory,HeaderCategoryID) values('Network & Security',4);
insert into Category(NameCategory,HeaderCategoryID) values('Handware',4);
insert into Category(NameCategory,HeaderCategoryID) values('Instruments',5);
insert into Category(NameCategory,HeaderCategoryID) values('Music Production',5);
insert into Category(NameCategory,HeaderCategoryID) values('Vocal',5);
insert into Category(NameCategory,HeaderCategoryID) values('Music Techniques',5);

/*user-password: admin-admin; andie-123456; john-123456; van-123456; aswift-123456; alegend-123456*/
insert into User_profile(FullName,Email,isTeacher,Permission,UserName,password) values('admin','@admin.xyz',0,'admin','admin','$2a$10$W0tZwAWKAqbYE21SoELjmejFV1x5tThAE43q1YoxE7wO45UyFkAxO');
insert into User_profile(FullName,Email,isTeacher,Permission,UserName,password) values('Andie Lee','teacher1@gmail.com',0,'teacher','andie','$2a$10$u4Npfd1W/VVZ4kyABP6RzuuLa0LWH61DVJKaDbMFwIekzV2/Qxg2G');
insert into User_profile(FullName,Email,isTeacher,Permission,UserName,password) values('John Lee','teacher2@gmail.com',1,'teacher','john','$2a$10$pMbkmm/htNKNlqEcfHDfS.ZSMe7KNIIdmVjYHeEsPkmLB/choKjhW');
insert into User_profile(FullName,Email,isTeacher,Permission,UserName,password) values('Van Lee','teacher3@gmail.com',1,'teacher','van','$2a$10$34RS3ZpIgYrc.rhDSxclVuiBcFtYch1s57AUPALGFXxF3bQ01yIM2');
insert into User_profile(FullName,Email,isTeacher,Permission,UserName,password) values('Andie Swift','teacher4@gmail.com',0,'teacher','aswift','$2a$10$qoIwjMiJxmYfcX/Nu238KedMxpV54xPvPBRVwLVZZiEtxKb1xg/Zu');
insert into User_profile(FullName,Email,isTeacher,Permission,UserName,password) values('Andie legend','teacher5@gmail.com',0,'teacher','alegend','$2a$10$6.H6Kp.DtEtghkFH9UkOP.p8Y27HxnvC/hG5SmxvGvv3Ix.NHZgx.');
insert into User_profile(FullName,Email,isTeacher,Permission,UserName,password) values('Maria','student1@gmail.com',0,'student','maria','$2a$10$znrfkDOSz/H0gyXNOWi9ReQZrPHrnkCFWf5peF0LRmzi46HR.BTx.');

insert into Chapter(NameChapter,idCourse) values('Chapter 1: Learning HTML',1);
insert into Chapter(NameChapter,idCourse) values('Chapter 1: Learning HTML',2);
insert into Chapter(NameChapter,idCourse) values('Chapter 1: Learning HTML',3);
insert into Chapter(NameChapter,idCourse) values('Chapter 1: Learning HTML',4);
insert into Chapter(NameChapter,idCourse) values('Chapter 1: Learning HTML',5);
insert into Chapter(NameChapter,idCourse) values('Chapter 2: Learning CSS',1);
insert into Chapter(NameChapter,idCourse) values('Chapter 2: Learning CSS',2);
insert into Chapter(NameChapter,idCourse) values('Chapter 2: Learning CSS',3);
insert into Chapter(NameChapter,idCourse) values('Chapter 2: Learning CSS',4);
insert into Chapter(NameChapter,idCourse) values('Chapter 2: Learning CSS',5);
insert into Chapter(NameChapter,idCourse) values('Chapter 1: About The Course',6);
insert into Chapter(NameChapter,idCourse) values('Chapter 1: About The Course',7);
insert into Chapter(NameChapter,idCourse) values('Chapter 1: About The Course',8);
insert into Chapter(NameChapter,idCourse) values('Chapter 1: About The Course',9);
insert into Chapter(NameChapter,idCourse) values('Chapter 1: About The Course',10);
insert into Chapter(NameChapter,idCourse) values('Chapter 1: About The Course',11);
insert into Chapter(NameChapter,idCourse) values('Chapter 1: About The Course',12);
insert into Chapter(NameChapter,idCourse) values('Chapter 1: About The Course',13);
insert into Chapter(NameChapter,idCourse) values('Chapter 1: About The Course',14);
insert into Chapter(NameChapter,idCourse) values('Chapter 1: About The Course',15);
insert into Chapter(NameChapter,idCourse) values('Chapter 1: About The Course',16);
insert into Chapter(NameChapter,idCourse) values('Chapter 1: About The Course',17);
insert into Chapter(NameChapter,idCourse) values('Chapter 1: About The Course',18);
insert into Chapter(NameChapter,idCourse) values('Chapter 1: About The Course',19);
insert into Chapter(NameChapter,idCourse) values('Chapter 1: About The Course',20);
insert into Chapter(NameChapter,idCourse) values('Chapter 1: About The Course',21);
insert into Chapter(NameChapter,idCourse) values('Chapter 1: About The Course',22);
insert into Chapter(NameChapter,idCourse) values('Chapter 1: About The Course',23);
insert into Chapter(NameChapter,idCourse) values('Chapter 1: About The Course',24);
insert into Chapter(NameChapter,idCourse) values('Chapter 1: About The Course',25);
insert into Chapter(NameChapter,idCourse) values('Chapter 1: About The Course',26);
insert into Chapter(NameChapter,idCourse) values('Chapter 1: About The Course',27);
insert into Chapter(NameChapter,idCourse) values('Chapter 1: About The Course',28);



insert into Lesson(NameLesson,Video,idChapter) values('Lesson 1: About The Course','what you learning in this course',1);
insert into Lesson(NameLesson,Video,idChapter) values('Lesson 1: About The Course','what you learning in this course',2);
insert into Lesson(NameLesson,Video,idChapter) values('Lesson 1: About The Course','what you learning in this course',3);
insert into Lesson(NameLesson,Video,idChapter) values('Lesson 1: About The Course','what you learning in this course',4);
insert into Lesson(NameLesson,Video,idChapter) values('Lesson 1: About The Course','what you learning in this course',5);
insert into Lesson(NameLesson,Video,idChapter) values('Lesson 1: About The Course','what you learning in this course',6);
insert into Lesson(NameLesson,Video,idChapter) values('Lesson 1: About The Course','what you learning in this course',7);
insert into Lesson(NameLesson,Video,idChapter) values('Lesson 1: About The Course','what you learning in this course',8);
insert into Lesson(NameLesson,Video,idChapter) values('Lesson 1: About The Course','what you learning in this course',9);
insert into Lesson(NameLesson,Video,idChapter) values('Lesson 1: About The Course','what you learning in this course',10);
insert into Lesson(NameLesson,Video,idChapter) values('Lesson 1: About The Course','what you learning in this course',11);
insert into Lesson(NameLesson,Video,idChapter) values('Lesson 1: About The Course','what you learning in this course',12);
insert into Lesson(NameLesson,Video,idChapter) values('Lesson 1: About The Course','what you learning in this course',13);
insert into Lesson(NameLesson,Video,idChapter) values('Lesson 1: About The Course','what you learning in this course',14);
insert into Lesson(NameLesson,Video,idChapter) values('Lesson 1: About The Course','what you learning in this course',15);
insert into Lesson(NameLesson,Video,idChapter) values('Lesson 1: About The Course','what you learning in this course',16);
insert into Lesson(NameLesson,Video,idChapter) values('Lesson 1: About The Course','what you learning in this course',17);
insert into Lesson(NameLesson,Video,idChapter) values('Lesson 1: About The Course','what you learning in this course',18);
insert into Lesson(NameLesson,Video,idChapter) values('Lesson 1: About The Course','what you learning in this course',19);
insert into Lesson(NameLesson,Video,idChapter) values('Lesson 1: About The Course','what you learning in this course',20);
insert into Lesson(NameLesson,Video,idChapter) values('Lesson 1: About The Course','what you learning in this course',21);
insert into Lesson(NameLesson,Video,idChapter) values('Lesson 1: About The Course','what you learning in this course',22);
insert into Lesson(NameLesson,Video,idChapter) values('Lesson 1: About The Course','what you learning in this course',23);
insert into Lesson(NameLesson,Video,idChapter) values('Lesson 1: About The Course','what you learning in this course',24);
insert into Lesson(NameLesson,Video,idChapter) values('Lesson 1: About The Course','what you learning in this course',25);
insert into Lesson(NameLesson,Video,idChapter) values('Lesson 1: About The Course','what you learning in this course',26);
insert into Lesson(NameLesson,Video,idChapter) values('Lesson 1: About The Course','what you learning in this course',27);
insert into Lesson(NameLesson,Video,idChapter) values('Lesson 1: About The Course','what you learning in this course',28);


insert into EnrolledCourse(IdUser,IdCourse,EnrollDate,rateStar,Comments,status) values(7,1,'2020-12-28 09:14:31',5,'Great Course <3','finished');
insert into EnrolledCourse(IdUser,IdCourse,EnrollDate,rateStar,Comments) values(7,2,'2020-12-28 09:14:31',3,'Watching videos is time consuming <3');
insert into EnrolledCourse(IdUser,IdCourse,EnrollDate,rateStar,Comments) values(7,3,'2020-12-28 09:14:31',1,'Bad Course, too boring');
insert into EnrolledCourse(IdUser,IdCourse,EnrollDate,rateStar,Comments) values(8,1,'2020-12-28 09:14:31',5,'wow, I love this course');
insert into EnrolledCourse(IdUser,IdCourse,EnrollDate,rateStar,Comments) values(8,6,'2020-12-28 09:14:31',4,'Good course<3');
insert into EnrolledCourse(IdUser,IdCourse,EnrollDate,rateStar,Comments) values(8,11,'2020-12-28 09:14:31',2,'Bad Course');
insert into EnrolledCourse(IdUser,IdCourse,EnrollDate,rateStar,Comments) values(9,6,'2020-12-28 09:14:31',5,'Great Course <3');
insert into EnrolledCourse(IdUser,IdCourse,EnrollDate,rateStar,Comments) values(9,7,'2020-12-28 09:14:31',3,'Watching videos is time consuming<3');
insert into EnrolledCourse(IdUser,IdCourse,EnrollDate,rateStar,Comments) values(9,11,'2020-12-28 09:14:31',2,'So boring');
insert into EnrolledCourse(IdUser,IdCourse,EnrollDate,rateStar,Comments) values(10,6,'2020-12-28 09:14:31',5,'Great Course <3');
insert into EnrolledCourse(IdUser,IdCourse,EnrollDate,rateStar,Comments) values(10,11,'2020-12-28 09:14:31',3,'video is very laggy<3');
insert into EnrolledCourse(IdUser,IdCourse,EnrollDate,rateStar,Comments) values(10,12,'2020-12-28 09:14:31',1,'Bad Course');
insert into EnrolledCourse(IdUser,IdCourse,EnrollDate,rateStar,Comments) values(11,21,'2020-12-28 09:14:31',5,'Great Course <3');
insert into EnrolledCourse(IdUser,IdCourse,EnrollDate,rateStar,Comments) values(11,22,'2020-12-28 09:14:31',3,'video is very laggy<3');
insert into EnrolledCourse(IdUser,IdCourse,EnrollDate,rateStar,Comments) values(11,26,'2020-12-28 09:14:31',1,'Bad Course!');
insert into EnrolledCourse(IdUser,IdCourse,EnrollDate,rateStar,Comments) values(12,21,'2020-12-28 09:14:31',5,'Great Course <3');
insert into EnrolledCourse(IdUser,IdCourse,EnrollDate,rateStar,Comments) values(12,26,'2020-12-28 09:14:31',3,'video is very laggy<3');
insert into EnrolledCourse(IdUser,IdCourse,EnrollDate,rateStar,Comments) values(12,31,'2020-12-28 09:14:31',1,'Bad Course @@@');
insert into EnrolledCourse(IdUser,IdCourse,EnrollDate,rateStar,Comments) values(13,31,'2020-12-28 09:14:31',5,'Great Course <3');
insert into EnrolledCourse(IdUser,IdCourse,EnrollDate,rateStar,Comments) values(13,36,'2020-12-28 09:14:31',3,'a beautiful life<3');
insert into EnrolledCourse(IdUser,IdCourse,EnrollDate,rateStar,Comments) values(13,39,'2020-12-28 09:14:31',1,'Bad Course!!!');
insert into EnrolledCourse(IdUser,IdCourse,EnrollDate,rateStar,Comments) values(14,31,'2020-12-28 09:14:31',5,'<3');
insert into EnrolledCourse(IdUser,IdCourse,EnrollDate,rateStar,Comments) values(14,36,'2020-12-28 09:14:31',3,'yeah, good course but video is so lag :D');
insert into EnrolledCourse(IdUser,IdCourse,EnrollDate,rateStar,Comments) values(14,39,'2020-12-28 09:14:31',1,'Bad Course =))');
insert into EnrolledCourse(IdUser,IdCourse,EnrollDate,rateStar,Comments) values(15,39,'2020-12-28 09:14:31',5,'Great Course <3');
insert into EnrolledCourse(IdUser,IdCourse,EnrollDate,rateStar,Comments) values(15,40,'2020-12-28 09:14:31',3,'hi every guys :D');
insert into EnrolledCourse(IdUser,IdCourse,EnrollDate,rateStar,Comments) values(15,44,'2020-12-28 09:14:31',1,'Bad Course :(');
insert into EnrolledCourse(IdUser,IdCourse,EnrollDate,rateStar,Comments) values(16,39,'2020-12-28 09:14:31',5,'Great Course <3');
insert into EnrolledCourse(IdUser,IdCourse,EnrollDate,rateStar,Comments) values(16,44,'2020-12-28 09:14:31',3,'alala');
insert into EnrolledCourse(IdUser,IdCourse,EnrollDate,rateStar,Comments) values(16,46,'2020-12-28 09:14:31',1,'I didnt like this course');
insert into EnrolledCourse(IdUser,IdCourse,EnrollDate,rateStar,Comments) values(17,1,'2020-12-28 09:14:31',5,'Great Course <3');
insert into EnrolledCourse(IdUser,IdCourse,EnrollDate,rateStar,Comments) values(17,40,'2020-12-28 09:14:31',3,'this voice in video is so sweet');
insert into EnrolledCourse(IdUser,IdCourse,EnrollDate,rateStar,Comments) values(17,46,'2020-12-28 09:14:31',1,'Bad Course <3');

insert into watchlist(IdUser,IdCourse) values(7,1);
insert into watchlist(IdUser,IdCourse) values(8,1);
insert into watchlist(IdUser,IdCourse) values(9,1);
insert into watchlist(IdUser,IdCourse) values(10,1);
insert into watchlist(IdUser,IdCourse) values(11,1);
insert into watchlist(IdUser,IdCourse) values(8,2);
insert into watchlist(IdUser,IdCourse) values(9,2);
insert into watchlist(IdUser,IdCourse) values(10,2);
insert into watchlist(IdUser,IdCourse) values(9,3);
insert into watchlist(IdUser,IdCourse) values(10,3);
insert into watchlist(IdUser,IdCourse) values(11,3);
insert into watchlist(IdUser,IdCourse) values(10,4);
insert into watchlist(IdUser,IdCourse) values(11,4);
insert into watchlist(IdUser,IdCourse) values(12,4);
insert into watchlist(IdUser,IdCourse) values(11,5);
insert into watchlist(IdUser,IdCourse) values(12,5);
insert into watchlist(IdUser,IdCourse) values(13,5);
insert into watchlist(IdUser,IdCourse) values(12,6);
insert into watchlist(IdUser,IdCourse) values(13,6);
insert into watchlist(IdUser,IdCourse) values(13,7);
insert into watchlist(IdUser,IdCourse) values(14,7);
insert into watchlist(IdUser,IdCourse) values(14,8);
insert into watchlist(IdUser,IdCourse) values(15,9);
insert into watchlist(IdUser,IdCourse) values(16,10);
insert into watchlist(IdUser,IdCourse) values(17,11);
insert into watchlist(IdUser,IdCourse) values(7,12);
insert into watchlist(IdUser,IdCourse) values(8,13);
insert into watchlist(IdUser,IdCourse) values(9,14);
insert into watchlist(IdUser,IdCourse) values(10,15);
insert into watchlist(IdUser,IdCourse) values(11,16);
insert into watchlist(IdUser,IdCourse) values(12,17);
insert into watchlist(IdUser,IdCourse) values(13,18);
insert into watchlist(IdUser,IdCourse) values(14,19);
insert into watchlist(IdUser,IdCourse) values(15,20);
insert into watchlist(IdUser,IdCourse) values(16,21);
insert into watchlist(IdUser,IdCourse) values(17,22);
insert into watchlist(IdUser,IdCourse) values(7,23);
insert into watchlist(IdUser,IdCourse) values(8,24);
insert into watchlist(IdUser,IdCourse) values(9,25);
insert into watchlist(IdUser,IdCourse) values(10,26);
insert into watchlist(IdUser,IdCourse) values(11,27);
insert into watchlist(IdUser,IdCourse) values(12,28);
insert into watchlist(IdUser,IdCourse) values(13,29);
insert into watchlist(IdUser,IdCourse) values(14,30);
insert into watchlist(IdUser,IdCourse) values(15,31);
insert into watchlist(IdUser,IdCourse) values(16,32);
insert into watchlist(IdUser,IdCourse) values(17,33);
insert into watchlist(IdUser,IdCourse) values(7,23);
insert into watchlist(IdUser,IdCourse) values(8,24);
insert into watchlist(IdUser,IdCourse) values(9,25);
insert into watchlist(IdUser,IdCourse) values(10,26);
insert into watchlist(IdUser,IdCourse) values(11,27);
insert into watchlist(IdUser,IdCourse) values(12,28);
insert into watchlist(IdUser,IdCourse) values(13,29);
insert into watchlist(IdUser,IdCourse) values(14,30);
insert into watchlist(IdUser,IdCourse) values(15,31);
insert into watchlist(IdUser,IdCourse) values(16,32);
insert into watchlist(IdUser,IdCourse) values(17,33);
insert into watchlist(IdUser,IdCourse) values(7,34);
insert into watchlist(IdUser,IdCourse) values(8,35);
insert into watchlist(IdUser,IdCourse) values(9,36);
insert into watchlist(IdUser,IdCourse) values(10,36);
insert into watchlist(IdUser,IdCourse) values(11,37);
insert into watchlist(IdUser,IdCourse) values(12,38);
insert into watchlist(IdUser,IdCourse) values(13,39);
insert into watchlist(IdUser,IdCourse) values(14,40);
insert into watchlist(IdUser,IdCourse) values(15,41);
insert into watchlist(IdUser,IdCourse) values(16,42);
insert into watchlist(IdUser,IdCourse) values(17,43);
insert into watchlist(IdUser,IdCourse) values(8,44);
insert into watchlist(IdUser,IdCourse) values(9,45);
insert into watchlist(IdUser,IdCourse) values(10,46);
insert into watchlist(IdUser,IdCourse) values(11,47);
insert into watchlist(IdUser,IdCourse) values(12,48);
insert into watchlist(IdUser,IdCourse) values(13,49);
insert into watchlist(IdUser,IdCourse) values(14,50);
insert into watchlist(IdUser,IdCourse) values(15,47);
insert into watchlist(IdUser,IdCourse) values(16,45);
insert into watchlist(IdUser,IdCourse) values(17,33);
