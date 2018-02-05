package corporation.controller;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;

import corporation.dao.DaoImplementacao;
import corporation.dao.DaoInterface;
import corporation.model.Cidades;

@Controller
@RequestMapping(value = "/cidades")
public class CidadesController extends DaoImplementacao<Cidades> implements DaoInterface<Cidades> {

	public CidadesController(Class<Cidades> persistenceClass) {
		super(persistenceClass);
	}

	@RequestMapping(value = "listar/{idEstado}", method = RequestMethod.GET, headers = "Accept=application/json")
	@ResponseBody
	public String listar(@PathVariable("idEstado") String idEstado) throws Exception {
		return new Gson().toJson(lista(Long.parseLong(idEstado)));
	}

	public List<Cidades> lista(Long codigoEstado) throws Exception {
		Criteria criteria = getSessionFactory().getCurrentSession().createCriteria(getPersistenceClass());
		// select * from Cidades where estados.id = x
		criteria.add(Restrictions.eq("estados.id", codigoEstado));
		return criteria.list();
	}

}
