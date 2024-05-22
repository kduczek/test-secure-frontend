import { faker } from '@faker-js/faker';
import { User } from '../types/user';
import { Roles } from '../types/roles';

export const getRandomUser = (): User => {
    return {
        username: faker.internet.userName(),
        password: faker.internet.password(),
        firstName: generateFirstName(),
        lastName: generateLastName(),
        email: faker.internet.email(),
        roles: [Roles.ROLE_ADMIN, Roles.ROLE_CLIENT]
    }
}

export const getRandomUserWithFirstName = (firstName: string): User => {
    return {
        ...getRandomUser(),
        firstName: firstName
    }
}

export const getRandomUserWithUsername = (username: string): User => {
    return {
        ...getRandomUser(),
        username: username
    }
}

export const getRandomUsername = (): string => {
    return faker.internet.userName()
}

const generateName = (nameGenerator: Function) => {
    let attempts = 0;
    let name = '';
    const minLength = 4;
    const maxAttempts = 20;

    while (name.length < minLength && attempts < maxAttempts) {
        name = nameGenerator();
        attempts++;
    }

    if (name.length >= minLength) {
        return name;
    }

    throw new Error("Failed to generate a valid name");
};

const generateFirstName = () => generateName(faker.person.firstName);
const generateLastName = () => generateName(faker.person.lastName);