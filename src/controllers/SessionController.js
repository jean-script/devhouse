// metodos: index, show, update store, destroy

/*
    index: listagem de sessões
    store: criar uma sessão
    show: listar uma unica sessão
    update: quando queremos alterar uma sessão
    destroy: quand queresmos deletar uma sessão
*/

import * as Yup from "yup";
import User from "../models/User";

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
    });

    const { email } = req.body;

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Falha na validação" });
    }

    // verificando se ete usuario já existe
    let user = await User.findOne({ email });

    if (!user) {
      // se não existir cria um novo
      user = await User.create({ email });
    }

    return res.json(user);
  }
}

export default new SessionController();
