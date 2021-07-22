import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { PinDropSharp } from '@material-ui/icons';
import { CardActionArea, styled } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    minHeight: 500,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    margin: '0.7em',
    marginTop: 0,
    alignContent: 'center'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  over: {
    overflowY:'scroll',
  },
  content: {
    height:400,
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'column',

  }
}));

const GlobalCss = withStyles({
  // @global is handled by jss-plugin-global.
  '@global': {
    // You should target [class*="MuiButton-root"] instead if you nest themes.
    '.MuiCardHeader-title': {
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    },
    '.MuiCardHeader-root': {
      minHeight: 55,
      padding: '1em 1em'
    }
  },
})(() => null);


export default function RecipeReviewCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  
  const orders = props.description
  const listItem = orders && orders.map((order) =>
    (<Typography paragraph>{order}</Typography>)
  );
  const ingredients = props.ingredientsArr
  const ingredientsList = ingredients && ingredients.map((ingredient) =>
    (<span>{ingredient}, </span>)
  );

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const path = "/detail/"+props.videoId;
  console.log(path);

  return (
    <>
    <Card className={classes.root}>
      <CardActionArea>
      <Link to={"/detail/"+props.videoId} 
            style={{textDecoration:'none',
                    color:'inherit'}}>
        <div className={classes.content}>
        <GlobalCss/>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
            </Avatar>
          }
          title= {props.title}
          subheader = {props.channelTitle}
        />
        <CardMedia
          className={classes.media}
          image={props.thumbnails}
          title="thumbnails"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
              음식재료<br/>
              {ingredientsList}
          </Typography>
        </CardContent>
        </div>
      </Link>
      </CardActionArea>

      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
        <ExpandMoreIcon />
        </IconButton>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>레시피:</Typography>
          {listItem}
        </CardContent>
      </Collapse>
    </Card>
    </>
  );
}
