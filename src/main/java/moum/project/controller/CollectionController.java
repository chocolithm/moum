package moum.project.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import moum.project.service.CollectionService;
import moum.project.service.CollectionStatusService;
import moum.project.service.MaincategoryService;
import moum.project.service.StorageService;
import moum.project.service.SubcategoryService;
import moum.project.vo.AttachedFile;
import moum.project.vo.Collection;
import moum.project.vo.CollectionStatus;
import moum.project.vo.Maincategory;
import moum.project.vo.Subcategory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;

@Controller
@RequestMapping("/collection")
@RequiredArgsConstructor
public class CollectionController {

  private final CollectionService collectionService;
  private final MaincategoryService maincategoryService;
  private final SubcategoryService subcategoryService;
  private final CollectionStatusService collectionStatusService;
  private final StorageService storageService;

  private final String folderName = "collection/";

  @GetMapping("form")
  public String form(Model model) throws Exception {
    List<Maincategory> maincategoryList = maincategoryService.list();
    List<CollectionStatus> collectionStatusList = collectionStatusService.list();

    model.addAttribute("maincategoryList", maincategoryList);
    model.addAttribute("collectionStatusList", collectionStatusList);

    return "collection/form";
  }

  @PostMapping("add")
  public String add(
      Collection collection,
      MultipartFile[] files) throws Exception {

    collection.setUserNo(2);

    List<AttachedFile> attachedFiles = new ArrayList<>();

    for (MultipartFile file : files) {
      if (file.getSize() == 0) {
        continue;
      }

      AttachedFile attachedFile = new AttachedFile();
      attachedFile.setFileCategory(AttachedFile.COLLECTION);
      attachedFile.setFilename(UUID.randomUUID().toString());
      attachedFile.setOriginFilename(file.getOriginalFilename());

      Map<String, Object> options = new HashMap<>();
      options.put(StorageService.CONTENT_TYPE, file.getContentType());

      storageService.upload(
          folderName + attachedFile.getFilename(),
          file.getInputStream(),
          options);

      attachedFiles.add(attachedFile);
    }

    collection.setAttachedFiles(attachedFiles);

    collectionService.add(collection);
    return "redirect:/myHome";
  }

  @GetMapping("view")
  public String view(int no, Model model) throws Exception {
    Collection collection = collectionService.get(no);
    List<Maincategory> maincategoryList = maincategoryService.list();
    List<Subcategory> subcategoryList = subcategoryService.list(collection.getMaincategoryNo());
    List<CollectionStatus> collectionStatusList = collectionStatusService.list();

    model.addAttribute("collection", collection);
    model.addAttribute("maincategoryList", maincategoryList);
    model.addAttribute("subcategoryList", subcategoryList);
    model.addAttribute("collectionStatusList", collectionStatusList);

    return "collection/view";
  }

  @PostMapping("update")
  public String update(
      Collection collection,
      MultipartFile[] files) throws Exception {

    collection = collectionService.get(collection.getNo());
    List<AttachedFile> attachedFiles = new ArrayList<>();

    for (MultipartFile file : files) {
      if (file.getSize() == 0) {
        continue;
      }

      AttachedFile attachedFile = new AttachedFile();
      attachedFile.setFileCategory(AttachedFile.COLLECTION);
      attachedFile.setFilename(UUID.randomUUID().toString());
      attachedFile.setOriginFilename(file.getOriginalFilename());

      Map<String, Object> options = new HashMap<>();
      options.put(StorageService.CONTENT_TYPE, file.getContentType());

      storageService.upload(
          folderName + attachedFile.getFilename(),
          file.getInputStream(),
          options);

      attachedFiles.add(attachedFile);
    }
    collection.setAttachedFiles(attachedFiles);

    collectionService.update(collection);
    return "redirect:/myHome";
  }

  @GetMapping("delete")
  public String delete(int no) throws Exception {
    collectionService.delete(no);
    return "redirect:/myHome";
  }
}
