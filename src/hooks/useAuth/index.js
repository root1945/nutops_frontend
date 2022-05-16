import { useContext } from 'react';
import AuthContext from 'src/contexts/JwtAuthContext';

const useAuth = () => useContext(AuthContext);

export default useAuth;
