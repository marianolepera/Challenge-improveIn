import './App.css';
import { Switch, Route, BrowserRouter,Redirect } from "react-router-dom";
import BandsScreen from "./screens/Bands";
import BandsDetailsScreen from "./screens/BandsDetails";
import LoginScreen from "./screens/Login";
import ProtectedRoute from './routes/ProtectedRoute';
import Typography from '@material-ui/core/Typography';
import PublicRoute from './routes/PublicRoute'; 


function App() {
  return (
    <div> 
    <BrowserRouter>
        <div className="container">   
        <Switch>
            <PublicRoute exact path="/login"  component={LoginScreen}></PublicRoute>
           <ProtectedRoute exact={true} path="/" component={BandsScreen}></ProtectedRoute>
           <ProtectedRoute exact={true} path="/bands/:id" component={BandsDetailsScreen}></ProtectedRoute>   
           <Route path="*">
             <Typography variant="h2">404 Not Found</Typography>
           </Route>
        </Switch>
        </div>
    </BrowserRouter>
    </div>
  );
}

export default App;
