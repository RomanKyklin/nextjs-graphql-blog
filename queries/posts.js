export const getPosts = `
    query {
        posts {
            id
            title
            text
        }
    }
`;

export const getPost = (id) => `
    query {
      post(id: ${id}) {
            id
            title
            text
      }
    }
`;

export const createPost = (title, text) => `
    query {
      createPost(title:"${title}", text:"${text}") {
            id
            title
            text
      }
    }
`;

export const deletePost = (id) => `
    query {
      deletePost(id: ${id}) {
            id
            title
            text
      }
    }
`;

export const updatePost = (id, title, text) => `
    query {
      updatePost(id: ${id}, title: "${title}", text: "${text}") {
            id
            title
            text
      }
    }
`;

export const createUser = (login, password) => `
    query {
        createUser(login: "${login}", password: "${password}") {
                id
                login
                password
         }
    }

`;

