import { Stack } from 'expo-router';

const AppLayout = () => {
  
  return (
    <Stack>
       
       <Stack.Screen name="index" options={{headerTitle: "Dashboard",headerBackVisible: false, headerShown: false}} />
        <Stack.Screen name="users/profile" options={{headerTitle: "Profile"}} />
       <Stack.Screen name="users/notification" options={{headerTitle: "Notification"}} />
       <Stack.Screen name="users/complaint" options={{headerTitle: "Complaint"}} />
       <Stack.Screen name="users/intro" options={{headerShown: "false"}} />


       <Stack.Screen name="Collectors/coll_home" options={{headerTitle: "Collectors Page"}} />
       <Stack.Screen name="Collectors/customer_search" options={{headerTitle: "Customer Information"}} />
       <Stack.Screen name="Collectors/pending_problem" options={{headerTitle: "Collectors"}} />
       <Stack.Screen name="Collectors/process_problem" options={{headerTitle: "Collectors"}} /> 
       <Stack.Screen name="Collectors/reg_problem_customer" options={{headerTitle: "Diiwaangalin Cabasho"}} /> 

       <Stack.Screen name="Collectors/customer_statement" options={{headerTitle: "customer statement"}} /> 

      
       <Stack.Screen name="Customers/customer_home" options={{headerTitle: "Customer Page"}} />
  
       <Stack.Screen name="Customers/statement" options={{headerTitle: "Statement"}} />
       <Stack.Screen name="login" options={{headerTitle: "aa", headerBackVisible: false, headerShown: false}} />
       <Stack.Screen name="welcome" options={{headerTitle: "aa", headerBackVisible: false, headerShown: false}} />

       

    </Stack>
  );
};

export default AppLayout;