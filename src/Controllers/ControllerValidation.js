class Validation {
    
  static validation(body) {
    const { chave, valor } = body;

    if (!chave) {
      throw new Error({ message: "Dados incompletos: chave é obrigatória." });
    }
    if (!valor || !valor.user) {
      throw new Error({ message:  "Dados incompletos: usuario é obrigatória." });
    }
    if (!valor || !valor.passw) {
      throw new Error({ message: "Dados incompletos: senha é obrigatória." });
    }
    
    // Opcional: Adicione regras de negócio (ex: tamanho da senha)
    /*if (valor.passw.length < 6) {
      throw new Error("A senha deve ter pelo menos 6 caracteres.");
    }*/
  }
}
export default Validation;
