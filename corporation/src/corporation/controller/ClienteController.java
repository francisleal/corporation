package corporation.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;

import corporation.dao.DaoImplementacao;
import corporation.dao.DaoInterface;
import corporation.model.Cliente;

@Controller
@RequestMapping(value="/cliente")
public class ClienteController extends DaoImplementacao<Cliente> implements DaoInterface<Cliente> {

	public ClienteController(Class<Cliente> persistenceClass) {
		super(persistenceClass);
	}
	
	@RequestMapping(value="salvar", method=RequestMethod.POST)
	@ResponseBody
	public ResponseEntity salvar(@RequestBody String jsonCliente) throws Exception {
		Cliente cliente = new Gson().fromJson(jsonCliente, Cliente.class);
		super.salvarOuAtualizar(cliente);
		return new ResponseEntity(HttpStatus.CREATED);
	}
	
	
	@RequestMapping(value="listar", method = RequestMethod.GET, headers = "Accept=application/json")
	@ResponseBody
	public String listar() throws Exception {		
		return new Gson().toJson(super.lista());
	}
	
	@RequestMapping(value="deletar/{codCliente}", method=RequestMethod.DELETE)
	public @ResponseBody String deletar(@PathVariable("codCliente") String codCliente) throws Exception {
		Cliente objeto = new Cliente();		
		objeto.setId(Long.parseLong(codCliente));
		super.deletar(objeto);
		return "";
	}
	
	@RequestMapping(value="buscarcliente/{codCliente}", method=RequestMethod.GET)
	public @ResponseBody String buscarCliente(@PathVariable("codCliente") String codCliente) throws Exception {
		Cliente objeto = super.loadObjeto(Long.parseLong(codCliente));
		if (objeto  == null) {
			return "{}";
		}
		return new Gson().toJson(objeto);
	}

}


//public String listar() throws Exception {	
//	// add cliente statico		
//	List<Cliente> clientes = new ArrayList<Cliente>();
//	
//	Cliente cliente = new Cliente();
//	cliente.setId(10L);
//	cliente.setEndereco("samambaia");
//	cliente.setNome("Fulano");
//	cliente.setTelefone("9999-6655");//
//	clientes.add(cliente);
//
//	cliente = new Cliente();
//	cliente.setId(13L);
//	cliente.setEndereco("rec das emas");
//	cliente.setNome("Beltrano");
//	cliente.setTelefone("9999-4433");//
//	clientes.add(cliente);		
//	return new Gson().toJson(clientes);		
//}
