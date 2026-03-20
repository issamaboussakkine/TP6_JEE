package ma.issam.tp6.controllers;

import ma.issam.tp6.entites.Personne;
import ma.issam.tp6.repositories.PersonneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/personnes")
@CrossOrigin(origins = "http://localhost:5173")
public class PersonneApiController {

    @Autowired
    private PersonneRepository personneRepository;

    @GetMapping
    public List<Personne> getAllPersonnes() {
        return (List<Personne>) personneRepository.findAll();
    }

    @GetMapping("/{id}")
    public Personne getPersonneById(@PathVariable Long id) {
        return personneRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Personne non trouvée"));
    }

    @PostMapping
    public Personne createPersonne(@RequestBody Personne personne) {
        return personneRepository.save(personne);
    }

    @PutMapping("/{id}")
    public Personne updatePersonne(@PathVariable Long id, @RequestBody Personne personne) {
        personne.setId(id);
        return personneRepository.save(personne);
    }

    @DeleteMapping("/{id}")
    public void deletePersonne(@PathVariable Long id) {
        personneRepository.deleteById(id);
    }
}