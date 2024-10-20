package moum.project.dao;

import java.util.List;
import java.util.Map;
import moum.project.vo.Collection;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface CollectionDao {
  boolean insert(Collection collection) throws Exception;

  List<Collection> list() throws Exception;

  Collection findBy(int no) throws Exception;

  boolean update(Collection collection) throws Exception;

  boolean delete(int no) throws Exception;

  boolean insertFiles(Collection collection) throws Exception;

  boolean deleteFiles(int no) throws Exception;
}
