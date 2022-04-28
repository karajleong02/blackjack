Please do the following in your sql server and don't forget to update the password :)

create database CS2803;
use CS2803;

create table registeredUsers(
    username varchar(60) primary key,
    password varchar(60) not null,
    bjwin int,
    bjlose int,
    bjtotals int,
    warstreak int
);

