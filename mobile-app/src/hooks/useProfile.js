import { useEffect, useState } from "react";
import agent from "../api/agent";
import { useNavigation } from "@react-navigation/core";


export default (username) => {

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();
  useEffect(() => {
    if (username) {
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

      const unsubscribe = navigation.addListener('focus', () => {
        fetchProfile();
      });
  
      return unsubscribe;

      
    }
  }, [username, navigation]);

  return [profile, loading, error]
}