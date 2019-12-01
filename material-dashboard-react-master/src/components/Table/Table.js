import React, { useEffect, useState}  from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// core components
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";
import Button from "components/CustomButtons/Button.js";
import './Table.css'
import axios from 'axios';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Input from "@material-ui/core/Input";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

const useStyles = makeStyles(theme => ({
  modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
  },
  paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
  },
}));
//const useStyles = makeStyles(styles);

export default function CustomTable(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [precoTable, setPrecoTable] = useState("");
  const [nomeTable, setNomeTable] = useState("");
  const [idState, setId] = useState("");

  const handleOpen = (id) => {
    console.log(id)
    setId(id)
    axios.get(`http://localhost:8080/api/produtos/${id}`)
    .then(res => {
      console.log('sucess:',res)
      
      setPrecoTable(res.data.preco)
      setNomeTable(res.data.nome)
    })
    setOpen(true)
   // id.preventDefault();
  
    console.log(id)

  //  window.location.reload(true);

    //alert(`Submitting Name ${preco}`)
  }
  const handleClose = () => {
      setOpen(false);
  };

  const alterarProduto = (evt) => {

     console.log(idState)
    axios.put(`http://localhost:8080/api/produtos/${idState}`,{nome: nomeTable,preco:precoTable})
    .then(res => {
      console.log('sucess:',res)
      
    })
    evt.preventDefault();
    window.location.reload(true);

  }
  const deleteProduto = (id) => {
    console.log(id)
    
    
    console.log(id)
    axios.delete(`http://localhost:8080/api/produtos/${id}`)
    .then(res => {
      console.log('sucess:',res)
    })
    window.location.reload(true);

    //alert(`Submitting Name ${preco}`)
  }
  const { tableHead, tableData, tableHeaderColor, dados } = props;
  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow className={classes.tableHeadRow} >
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    key={key}
                  >
                    {prop}

                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {dados.map((prop, key) => {

            return(
            

              <TableRow key={key} className={classes.tableBodyRow}>
                       <TableCell style={{width:'200px'}}  className={classes.tableCell}>
                         {prop.nome}
                   </TableCell>
                   <TableCell style={{width:'200px'}}  className={classes.tableCell}>
                        R$ {prop.preco}
                   </TableCell>
                   <TableCell style={{width:'200px'}}  className={classes.tableCell}>
                   {/* <Button  type="submit" onClick={() => alterarProduto()} style={{width:'50px'}}  color="info">Alterar</Button> */}
                  
                   <Button variant="contained"  onClick={() => handleOpen(prop.id)} style={{width:'50px'}} color="info" >
                    Alterar
                     </Button>
                   </TableCell>
                   <TableCell style={{width:'200px'}}  className={classes.tableCell} key={key}>
                     
                     <Button  type="submit" onClick={() => deleteProduto(prop.id)} style={{width:'50px'}}  color="danger">Excluir</Button>

                   </TableCell>
              </TableRow>
            );
         
          })}
        </TableBody>
      </Table>
     

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div>
       <GridItem xs={12} sm={12} md={12}>
        <form onSubmit={alterarProduto}>
       
          <Card>

            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Editar Produto        </h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={3}>

                  <Input
                   value={nomeTable}
                   onChange={e => setNomeTable(e.target.value)}  
                    style={{marginTop:"43px"}}
                    placeholder="Nome do produto"
                    id="produto"
                
                  />
                </GridItem>

                <GridItem xs={12} sm={12} md={4}>
                  <Input
                  value={precoTable}
                  onChange={e => setPrecoTable(e.target.value)}  
                   style={{marginTop:"43px"}}
                    placeholder="Preço do produto"
                    id="preco-produto"
                  
                  />
                 
                </GridItem>
              </GridContainer>
            
              
         
            </CardBody>
            <CardFooter>

              <Button  type="submit"  color="primary">Atualizar</Button>
            </CardFooter>
          </Card>
          </form>

        </GridItem>
                    </div>
                </Fade>
            </Modal>

    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray"
};

CustomTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};
