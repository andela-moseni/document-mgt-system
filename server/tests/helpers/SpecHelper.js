import faker from 'faker';

const SpecHelper = {
  adminRole: {
    title: 'admin'
  },

  regularRole: {
    title: 'regular'
  },

  authorRole: {
    title: 'author'
  },

  contributorRole: {
    title: 'contributor'
  },

  specUser1: {
    name: 'Mercy Oseni',
    email: 'mercy.oseni@andela.com',
    password: 'mercy',
    roleId: 1
  },

  specUser2: {
    name: 'Raphael Akpan',
    email: 'raphael.akpan@andela.com',
    password: 'raphael',
    roleId: 2
  },

  invalidUser: {
    name: faker.name.firstName() + " " + faker.name.lastName(), 
    Eemail: faker.internet.email(),
    password: faker.internet.password()
  },

  invalidUser2: {
    Eemail: 'email@test.com',
    password: 'pass'
  },

  invalidUser3: {
    Email: 'ifiok@test.com'
  },

  specUser3: {
    name: faker.name.firstName() + " " + faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 2
  },

  specUser4: {
    name: 'Faith Omokaro',
    email: 'faith.omokaro@andela.com',
    password: 'faith',
    roleId: 3
  },

  specUser5: {
    name: 'Omotola Mercy',
    email: 'omotola.mercy@test.com',
    password: 'omotola',
    roleId: 4
  },

  specUser6: {
    name: 'Adeshola Barbie',
    email: 'adeshola@test.com',
    password: 'adeshola',
    roleId: 3
  },

  specUser7: {
    name: 'Cindy Barbie',
    email: 'cindy@test.com',
    password: 'cindy',
    roleId: 3
  },

  specUser8: {
    name: 'Sophiat Ayomide',
    email: 'sophiat@test.com',
    password: 'sophiat',
    roleId: 3
  },

 specUser9: {
    name: 'Oyin Marie',
    email: 'oyin@test.com',
    password: 'oyin',
    roleId: 3
  },
  
  testDocument1: {
    title: 'YOYOL',
    content: 'In Andela, we believe You Own Your Own Learning',
    access: 'public',
    type: 'TIA',
    OwnerId: 1,
    
  },

  testDocument2: {
    title: 'Computer Science',
    content: 'Computer science is the study of the theory, experimentation,and'
    + ' engineering that form the basis for the design and use of computers.'
    + ' It is the scientific and practical approach to computation and its applications'
    + 'and the systematic study of the feasibility, structure, expression, and'
    + ' mechanization of the methodical procedures (or algorithms) that'
    + ' underlie the acquisition, representation, processing, storage,'
    + ' communication of, and access to information.',
    access: 'role',
    type: 'Education',
    OwnerId: 2,
    
  },

  testDocument3: {
    title: 'Text Editor',
    content: 'A text editor is a type of program used for editing plain text'
    + ' files. Such programs are sometimes known as "notepad" software,'
    + ' following the Microsoft Notepad. Text editors are provided with'
    + 'operating systems and software development packages, and can be used'
    + 'to change configuration files, documentation files and'
    + 'programming language source code.',
    access: 'role',
    type: 'Education',
    OwnerId: 3,
    
  },

  testDocument4: {
    title: faker.commerce.department(),
    content: faker.lorem.paragraph(),
    access: 'private',
    type: 'Note',
    OwnerId: 4,
    
  },

  testDocument5: {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    access: 'public',
    type: 'Note',
    OwnerId: 5,
    
  },

  invalidDocument: {
    newTitle: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    myAccess: 'private',
    type: 'journal',
    OwnerId: 3,
    
  },

  testDocument6: {
    title: 'My Love Note',
    content: 'Thank you for letting me “see” South Philly and for being a'
    + ' neighborhood where everyone seems to be my friend.'
    + ' A typical fall day: we took a walk down East Passyunk Ave and said'
    + ' hello to Jessie at Belle Cakery, visited with all the great folks...',
    access: 'public',
    type: 'appreciation',
    OwnerId: 1,
    
  },

  testDocument7: {
    title: 'Dear Diary',
    content: 'On her thirteenth birthday, Anne Frank’s parents give her a'
    + ' diary. She’s excited because she wants someone—or something—in which'
    + ' to confide all of her secret thoughts. Even though she has a rich'
    + ' social life, she feels misunderstood by everyone she knows.'
    + ' Anne starts writing about daily events, her thoughts,'
    + ' school grades, boys, all that.',
    access: 'private',
    type: 'diary',
    OwnerId: 2,
    
  },

  testDocument8: {
    title: faker.commerce.department(),
    content: faker.lorem.paragraph(),
    access: 'public',
    type: 'Note',
    OwnerId: 3,
    
  },

  testDocument9: {
    title: faker.commerce.department(),
    content: faker.lorem.paragraph(),
    access: 'role',
    type: 'Note',
    OwnerId: 3,
    
  },
};

export default SpecHelper;