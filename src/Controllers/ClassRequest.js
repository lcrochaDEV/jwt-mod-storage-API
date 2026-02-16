import Hash from "./ControllerHash.js";
import JWT from "./ControllerJWT.js"
import Validation from "./ControllerValidation.js";

class Rotas {

  static async methodGet(req, res){ //GET OK
    try {
      const id = req.params.id;
      if (id) {
          res.status(200).json(data); 
        }else{
          res.status(200).json(data);       
        }
      }
      catch(error){
        res.status(500)
        res.send({mensagem: error.message})   
      }
    };
    static async methodPost (req, res) { //POST OK
      try {
        res.status(201).json({ message: "Criado com sucesso"});
      } catch (erro) {
        res.status(500).json({ message: `${erro.message} - Falha ao cadastrar` });
      }
    }
    static async methodPetch(req, res){
      try {
        res.status(200).json({ message: "Dados atualizados com sucesso!" }); 
      } catch (error) {
        res.status(500).json({ message: `${error.message} - Falha na atualização` });
      }
    };
    static async methodPetch(req, res){
      try {
        res.status(200).json({ message: "Dados atualizados com sucesso!" }); 
      } catch (error) {
        res.status(500).json({ message: `${error.message} - Falha na atualização` });
      }
    };
    static async methodDelete(req, res) { //DELETE OK
      try {
        res.status(200).json({ message: "Dados excluídos com sucesso" });
      } catch (erro) {
        res.status(500).json({ message: `${erro.message} - Falha ao Deletar` });
      }
    };
    
    //CRIPTO HASH ROUTER
    static async methodPostHash (req, res) { //POST OK
      try {
        Validation.validation(req.body); //Class que valida os dados

        const { chave, valor, expiracao } = req.body;

        const criptograPassw = await Hash.setHash(valor.passw);
        const novosDados = {
          chave,
          valor: { ...valor, passw: criptograPassw },
          expiracao
        };
        const dadosCripto = JWT.gerarToken(novosDados);
        console.log("Hash gerado:", dadosCripto)
 
        res.status(201).json({ message: "Criado com sucesso"});
      } catch (erro) {
        res.status(500).json({ message: `${erro.message} - Falha ao cadastrar` });
      }
    }
  }
  
export default Rotas;