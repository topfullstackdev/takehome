# Take Home Project

Challenge: A directory contains multiple files and directories of non-uniform file and directory names. Create a program that traverses a base directory and creates an index file that can be used to quickly lookup files by name, size, and content type.


## Getting Started


### Environments
Installing [Node.js](https://nodejs.org/en/) (or `brew install node`)


### Install Dependencies

```
npm run install
```

### Run Porject

```
npm run start
```

### Feature
- Once it runs, it is created an indices file(`indicesData.json`) based on a `binary tree algorithm` from the `test_data` directory.
- It can search the files in the `test_data` directory by file Name, Type, Size.

### Example
- Search by file `type`

![Screenshot at Jul 25 16-00-36](https://user-images.githubusercontent.com/78063448/180864242-8e2f4e79-11e9-4c7e-8d2f-628bc6a52382.png)

- Search by file `name`

![image](https://user-images.githubusercontent.com/78063448/180864436-43d2d158-41c8-4dd5-9aaf-3cec089c5b3e.png)

- Search by file `size`

![image](https://user-images.githubusercontent.com/78063448/180864549-c123c4b7-c870-4c35-b5de-4b268bfe7295.png)

- Search by file `size` and `name` and `type`

![image](https://user-images.githubusercontent.com/78063448/180864732-49410106-916d-4011-945f-2d0ccfdfbb5a.png)

