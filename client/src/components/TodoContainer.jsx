import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DeleteIcon from '@material-ui/icons/Delete';


import { addLeaf } from '../redux/actions/leafsActions';
import { removeLeaf } from '../redux/actions/leafsActions';
import { addBranch, fetchBranch, removeBranch } from '../redux/actions/branchesActions';


class TodoContainer extends Component {
  componentDidMount(){
    // this.props.fetchBranch(this.props.nodeData.tree_pid)
  }
  state = {
    open: false,
    todoItem_content: ''
  };

  clickHandler = (event, value) => {
    event.stopPropagation();
    if (event.shiftKey) {
      this.setState({ open: true });
    }
  }

  handleEnterPress = (event) => {
    if (event.key === 'Enter') {
      console.log(this.state.todoItem_content, this.props.nodeData.branch_id)
      this.props.addLeaf(this.state.todoItem_content, this.props.nodeData.branch_id )
      this.state.todoItem_content = '';
    }
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  // addBranch = (branch_pid, tree_pid) => {
  //   this.props.addBranch(branch_pid, tree_pid);
  // }

  render() {
    const handleChange = todoItem_content => event => {
      this.setState({
        [todoItem_content]: event.target.value,
      });
    };

    const { classes, nodeData, leafs } = this.props;

    const renderTodos = () => {
      return leafs.map((leaf, i)=>{
        // console.log(leaf.branch_pid, nodeData.branch_id )
        if(leaf.branch_pid === nodeData.branch_id){
          return (
            <ListItem className={classes.leaf} key={i}>
              <ListItemText primary={leaf.todoItem_content} primaryTypographyProps={{ variant: "subtitle1"}} />
              <ListItemSecondaryAction onClick={(e) => e.stopPropagation()}>
                <div 
                onClick={() => this.props.removeLeaf(leaf.leaf_id)} 
                style={{ fontSize: "25px", color: "red"}}
                > 
                  <DeleteIcon />
                </div>
              </ListItemSecondaryAction>
            </ListItem>
          );
        }
      })


    }
    // console.log(nodeData)
    return (
      <React.Fragment>

        <div className={classes.root}>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <List component="nav" className={classes.list}>
                  <div
                    style={{
                      fontSize: "25px",
                      color: "white",
                      backgroundColor: "red",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      this.props.branches[0].children ? 
                      this.props.removeBranch(nodeData.branch_id, nodeData.tree_pid) : null
                    }}

                  > <DeleteIcon /> </div>
                  
                  <TextField
                    style={{ backgroundColor: "#d6e5ff", height: "30px"}}
                    id="outlined-name"
                    placeholder="Add a todo..."
                    className={classes.textField}
                    value={this.state.todoItem_content}
                    onChange={handleChange('todoItem_content')}
                    margin="none"
                    variant="outlined"
                    onClick={(e)=> e.stopPropagation()}
                    onKeyPress={this.handleEnterPress}
                  />
                  {renderTodos()}
                </List>
                <div 
                style={{
                  fontSize: "25px",
                  color: "white",
                  backgroundColor: "green",
                }}
                onClick={(e)=> {
                  e.stopPropagation();
                  this.props.addBranch(nodeData.branch_id, nodeData.tree_pid)
                }}
                >+</div>
              </Paper>
            </Grid>
          </Grid>
        </div>

      </React.Fragment>
    );
  }
}

TodoContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};


const styles = theme => ({
  card: {
    margin: '20px 0',
    '&:first-child': {
      margin: '0'
    },
  },
  media: {
    objectFit: 'contain',
    height: 300,
    width: 300
  },
  textField: {
    width: '100%',
    borderRadius: 4,
    backgroundColor: theme.palette.common.white,
    fontSize: 16,
  },
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width: "250px",
    margin: "0",
    padding: "0"
  },
  textField: {
    width: '100%',
    borderRadius: 4,
    backgroundColor: theme.palette.common.white,
    fontSize: 12,
  },
  list: {
    margin: "0",
    padding: "0"
  },
  leaf: {
    backgroundColor: 'white',
    borderBottom: '1px solid grey',
    '&:hover': {
      backgroundColor: 'white'
    },
    width: "100%"
  }
});

const mapStateToProps = state => ({
  leafs: state.leafs,
  branches: state.branches
})

const mapDispatchToProps = {
  addLeaf,
  removeLeaf,
  addBranch,
  fetchBranch,
  removeBranch
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TodoContainer));