CREATE DATABASE worththeweight;

GO

CREATE TABLE worththeweight.dbo.Users (
userid int NOT NULL IDENTITY(1,1),
fname varchar(50),
lname varchar(50),
email varchar(50) NOT NULL,
pass_word varchar(25) NOT NULL,
height_feet int,
height_inches int,
weight decimal,
gender varchar(20),
stat varchar(20),
bio text,
birth_date date,
phone_num int,
weight_goal decimal,
cal_budget int,
PRIMARY KEY(userid)
);

CREATE TABLE worththeweight.dbo.WeightTracking (
trackingid int NOT NULL IDENTITY(1,1),
userid int NOT NULL,
weight decimal NOT NULL,
track_date datetime NOT NULL,
PRIMARY KEY(trackingid),
FOREIGN KEY(userid) REFERENCES worththeweight.dbo.Users(userid)
);
 
CREATE TABLE worththeweight.dbo.MicroLog (
microid int NOT NULL IDENTITY(1,1),
userid int NOT NULL,
miname_1 varchar(30) NOT NULL,
amount_1 varchar(30) NOT NULL,
miname_2 varchar(30) NOT NULL,
amount_2 varchar(30) NOT NULL,
midate datetime NOT NULL,
PRIMARY KEY(microid),
FOREIGN KEY(userid) REFERENCES worththeweight.dbo.Users(userid)
);

CREATE TABLE worththeweight.dbo.MacroLog (
macroid int NOT NULL IDENTITY(1,1),
userid int NOT NULL,
maname_1 varchar(30) NOT NULL,
amount_1 varchar(30) NOT NULL,
maname_2 varchar(30) NOT NULL,
amount_2 varchar(30) NOT NULL,
madate datetime NOT NULL,
PRIMARY KEY(macroid),
FOREIGN KEY(userid) REFERENCES worththeweight.dbo.Users(userid)
);

CREATE TABLE worththeweight.dbo.Meal (
mealid int NOT NULL IDENTITY(1,1),
userid int NOT NULL,
meal_dte datetime NOT NULL,
food_one varchar(30) NOT NULL,
food_one_cals decimal NOT NULL,
food_two varchar(30),
food_two_cals decimal,
food_three varchar(30),
food_three_cals decimal,
meal_type varchar(15) NOT NULL,
PRIMARY KEY(mealid),
FOREIGN KEY(userid) REFERENCES worththeweight.dbo.Users(userid)
);

CREATE TABLE worththeweight.dbo.Water (
waterid int NOT NULL IDENTITY(1,1),
userid int NOT NULL,
amount decimal NOT NULL,
water_date datetime NOT NULL,
PRIMARY KEY(waterid),
FOREIGN KEY(userid) REFERENCES worththeweight.dbo.Users(userid)
);

CREATE TABLE worththeweight.dbo.Exercise (
exerciseid int NOT NULL IDENTITY(1,1),
userid int NOT NULL,
exname varchar(50) NOT NULL,
extime datetime NOT NULL,
exdate datetime NOT NULL,
PRIMARY KEY(exerciseid),
FOREIGN KEY(userid) REFERENCES worththeweight.dbo.Users(userid)
);