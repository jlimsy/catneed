# Catneed

Catneed connects community cat rescuers/fosterers and cat owners to share essential like food, medical items, and carriers. By providing a space for these groups, resources are directed to where they are needed most, supporting the welfare of community cats.

## Features

**Sign up for an account:** Signup form consists of the necessary validations for valid inputs, minimum password length and confirm password watch ensures that both password fields have the same input. Password is hashed by bcrypt.

![Sign Up page](public/01_Signup.png)

**Login to an account**: Logins authenticated with JSON Web Token. New users are notified to update their postal code for optimal search results.

![Login page](public/02_Login.png)
![Reminder to update postal code](public/02a_Postal.png)

**Browse donations or requests:** Cat rescuers can browse what is currently being donated, search item by name, filter by categories, and sort by proximity based on postal codes of donors.

![Browse page](public/03_Browse.png)
![Sort by distance](public/03a_SortByDist.png)

**Post a request or donate an item:** Cat rescuers can post a request for an item that they require, while donors can post new or unused items that they no longer need.

![Post a Donation page](public/04_PostDonate.png)
![Post a Request page](public/05_PostReq.png)

**View listings:** Users can view and delete what they have previously requested or donated.

![View Listings](public/08_Listings.png)

**Chat feature:** Users can chat to arrange for pickup of items.

![Chat feature](public/06_Chat.png)

**Admin:** Users of Admin tier can view all users on the platform and make them admin

![Admin feature](public/07_Admin.png)
