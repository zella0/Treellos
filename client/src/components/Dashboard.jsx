import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

// redux dependencies
import { fetchTrees, addTree, removeTree } from '../redux/actions/treesActions';
import { fetchBranches, fetchBranch } from '../redux/actions/branchesActions';

// components dependencies
import TreeContainer from './TreeContainer';

class Dashboard extends Component {
  componentDidMount() {
    this.props.fetchTrees();
  }

  state = {
    value: null,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  // *** POSSIBLE FUTURE REFACTORING *** 
  // full iterations when navigating tabs
  renderTreesTab = (trees) => {
    return trees.map((tree) => {
      return (
        <Tab
          key={tree.id}
          component="div"
          style={{ borderRight: "0.2px solid #777", width: "200px" }}
          onClick={() => this.props.fetchBranch(tree.id)}
          label={
            <React.Fragment>
              <div style={{ display: "flex", alignItems: "center", }}>
                <Typography variant="subtitle1"> {tree.project_name} </Typography>
                <IconButton style={{ position: "absolute", right: -10, top: -10, color: "red" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    this.props.removeTree(tree.id)
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            </React.Fragment>
          } />
      );
    })
  }

  guid = () => {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}


  render() {
    const { classes, trees } = this.props;
    const { value } = this.state;
    // console.log(trees)
    return (
      trees &&
      <React.Fragment>
        <div className={classes.root}>

          <AppBar position="static" color="default">
            <Button mini variant="fab" color="primary" aria-label="Add" className={classes.button}
              style={{ backgroundColor: "green" }}
              onClick={() => this.props.addTree({ project_name: `Project ${trees.length === 0 ? 0 : trees[trees.length - 1].id + 1 }` })}
            >
              <AddIcon style={{backgroundColor: "green"}} />
            </Button>
            <Tabs
              value={value}
              onChange={this.handleChange}
              indicatorColor="primary"
              textColor="primary"
              scrollable
              scrollButtons="auto"
            >
              {this.renderTreesTab(trees)}
            </Tabs>
          </AppBar>
          {this.props.branches.length > 0 ? <TreeContainer /> : null}
        </div>
      </React.Fragment>
    );
  }
}

// material UI configs
// *******

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  button: {
    margin: theme.spacing.unit,
    position: "absolute",
    top: 3

  },
});

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};
// *******

const mapStateToProps = state => ({
  trees: state.trees,
  branches: state.branches
})

const mapDispatchToProps = {
  fetchTrees,
  addTree,
  removeTree,

  fetchBranches,
  fetchBranch
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Dashboard));