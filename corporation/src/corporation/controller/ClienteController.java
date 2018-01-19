package corporation.controller;

import org.springframework.stereotype.Controller;

import corporation.dao.DaoImplementacao;
import corporation.dao.DaoInterface;
import corporation.model.Cliente;

@Controller
public class ClienteController extends DaoImplementacao<Cliente> implements DaoInterface<Cliente> {

	public ClienteController(Class<Cliente> persistenceClass) {
		super(persistenceClass);
	}

}
