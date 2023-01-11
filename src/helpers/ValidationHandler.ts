import bcrypt from 'bcryptjs';

// Checking if email is valid ---------------------------------------------------------------------

export function isAValidEmail(email: string): boolean {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email); 
}

// Checking if password contains at least one number, one letter and one special character ---------

export function isAValidPassword(password: string): boolean {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W]).{8,}$/;
    return passwordRegex.test(password);
}

// Checking if name contains only letters and spaces ------------------------------------------------

export function isAValidName(name: string): boolean {
    const nameRegex = /^[a-zA-Z ]{2,30}$/;
    return nameRegex.test(name);
}

// Checking if birthdate is a valid Date ------------------------------------------------------------

export function isAValidBirthdate(birthdate: string): boolean {
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d$/;
    //console.log(isHigherThanToday(birthdate));
    return dateRegex.test(birthdate) && !isHigherThanToday(birthdate);   
}

// Checking all the four functions above ---------------------------------------------------------

export function isAValidInfo(name?: string, email?: string, password?: string, birthdate?: string): boolean {
    if (name && !isAValidName(name)) return false;
    if (email && !isAValidEmail(email)) return false;
    if (password && !isAValidPassword(password)) return false;
    if (birthdate && !isAValidBirthdate(birthdate)) return false;
    return true;
}

// Checking if has any empty field ------------------------------------------------------------------

export function hasEmptyFieldsCreateOrUpdate(name: string, birthdate: string, email: string, password: string): boolean {
    return [name, birthdate, email, password].some(field => !field || field.trim() === "");
}

export function hasEmptyFieldsLogin(email: string, password: string): boolean {
    return [email, password].some(field => !field || field.trim() === "");
}

// Checking if the data has changed for update user ------------------------------------------------

export function hasChangedData( user: any,name?: string, birthdate?: string, email?: string, password?: string): boolean {
    if(name && name !== user.name) return true;
    if(birthdate && birthdate !== user.birthdate) return true;
    if(email && email !== user.email) return true;
    if(password && !bcrypt.compareSync(password, user.password as string)) return true;
    return false;
}

// Checking if the date string is higher than today -------------------------------------------------

export function isHigherThanToday(date: string): boolean {
    const today = new Date();
    const dateArray = date.split("/");
    const dateToCheck = new Date(`${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`);
    return dateToCheck > today;
}

// checking if the string is a valid ObjectId string -----------------------------------------------

export function isAValidObjectId(id: string): boolean {
    const objectIdRegex = /^[0-9a-fA-F]{24}$/;
    return objectIdRegex.test(id);
}

// Checking if the req.body received data is a string type -----------------------------------------

export function isAStringType(name?: any, email?: any, birthdate?: any, password?: any): boolean {
    const values = [name, email, birthdate, password].filter(value => value !== undefined);
    return values.every(value => typeof value === "string");
}


