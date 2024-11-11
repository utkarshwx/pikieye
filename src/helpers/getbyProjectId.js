import axios from "axios";

const token = sessionStorage.getItem('token');


// export const getbyProjectId = async (projectId) => {
//     const projectsUser = [];

//     instance.get('/project/user')
//         .then(projectsResponse => {
//             projectsResponse.data.forEach(project => {
//                 projectsUser.push(project);
//             })
//             const project = projectsUser.find(project => project.pid == projectId);
//             console.log(project);
//             return project;
//         })
//         .catch(error => {
//             console.log(error);
//             return {};
//         })
// }


export const getbyProjectId = async (projectId) => {
    try {
        const projectsResponse = await axios.get('/project/user');
        const projectsUser = projectsResponse.data;
        if(typeof projectsUser !== 'object') return {};
        const project = projectsUser.find(project => project.id == projectId);
        return project;
    } catch (error) {
        console.log(error);
        return {};
    }
};
