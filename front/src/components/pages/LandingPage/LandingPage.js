import './LandingPage.css';
import Card from '../../configs/Card/Card'
import Grid from '@material-ui/core/Grid';
import SearchInput from './SearchInput'

function LandingPage(props) {

  return (
    <div> 
      <Grid item xs={12} 
            style={{  display: 'flex' ,
                      justifyContent: 'center',
                      marginTop:'10rem'}}>
        <SearchInput props={props}></SearchInput>
      </Grid>
      <Grid item xs={12}>
        
      </Grid>
    </div>
    
  );
}

export default LandingPage;
