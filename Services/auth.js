import axios from './API';
const userSignupWithMobile = async (phone, password) => {
  const response = await axios.post('/auth/loginOrRegister', {
    phone,
    password,
  });
  return response;
};

export {userSignupWithMobile};
