package corporation.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;

import corporation.dao.DaoImplementacao;
import corporation.dao.DaoInterface;
import corporation.model.Estados;

@Controller
@RequestMapping(value="/estados")
public class EstadosController extends DaoImplementacao<Estados> implements DaoInterface<Estados> {

	public EstadosController(Class<Estados> persistenceClass) {
		super(persistenceClass);
	}	
	
	@RequestMapping(value="listar", method = RequestMethod.GET, headers = "Accept=application/json")
	@ResponseBody
	public String listar() throws Exception {		
		return new Gson().toJson(super.lista());
	}
}
