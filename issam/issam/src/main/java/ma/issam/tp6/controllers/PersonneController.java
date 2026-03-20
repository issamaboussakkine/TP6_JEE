package ma.issam.tp6.controllers;

import ma.issam.tp6.entites.Personne;
import ma.issam.tp6.repositories.PersonneRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class PersonneController {

    @Autowired
    private PersonneRepository personneRepository;

    @GetMapping("/inscription")
    public String showInscriptionForm(Personne personne) {
        return "ajouter-personne";
    }

    @PostMapping("/ajouter")
    public String ajouterPersonne(@Valid Personne personne, BindingResult result, Model model) {
        if (result.hasErrors()) {
            return "ajouter-personne";
        }
        personneRepository.save(personne);
        model.addAttribute("personnes", personneRepository.findAll());
        return "index";
    }

    @GetMapping("/modifier/{id}")
    public String showModifierForm(@PathVariable("id") long id, Model model) {
        Personne personne = personneRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("ID invalide : " + id));
        model.addAttribute("personne", personne);
        return "modifier-personne";
    }

    @PostMapping("/miseajour/{id}")
    public String mettreAJour(@PathVariable("id") long id, @Valid Personne personne,
                              BindingResult result, Model model) {
        if (result.hasErrors()) {
            personne.setId(id);
            return "modifier-personne";
        }
        personneRepository.save(personne);
        model.addAttribute("personnes", personneRepository.findAll());
        return "index";
    }

    @GetMapping("/supprimer/{id}")
    public String supprimerPersonne(@PathVariable("id") long id, Model model) {
        Personne personne = personneRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("ID invalide : " + id));
        personneRepository.delete(personne);
        model.addAttribute("personnes", personneRepository.findAll());
        return "index";
    }
}