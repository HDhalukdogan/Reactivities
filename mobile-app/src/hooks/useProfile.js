import { useEffect, useState } from "react";
import agent from "../api/agent";


export default (username) => {

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
      const fetchProfile = async () => {
        try {
          const res = await agent.Profile.getProfile(username);
          setProfile(res);
        } catch (error) {
          setError('Error fetching profile data');
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchProfile();
    }, [username]);

return [profile,loading,error]
}