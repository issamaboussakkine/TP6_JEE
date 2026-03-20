package ma.issam.tp6.repositories;

import ma.issam.tp6.entites.Personne;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonneRepository extends CrudRepository<Personne, Long> {
}