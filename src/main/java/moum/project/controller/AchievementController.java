package moum.project.controller;

import java.util.*;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import moum.project.service.AchievementService;
import moum.project.service.StorageService;
import moum.project.service.SubcategoryService;
import moum.project.vo.*;
import moum.project.vo.Collection;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Controller
@RequestMapping("/achievement")
@RequiredArgsConstructor
public class AchievementController {

  @NonNull
  private final AchievementService achievementService;

  @GetMapping("list")
  public String list(Model model) throws Exception {
    List<Achievement> list = achievementService.list();
    model.addAttribute("list", list); //모델에다가 업적 정보를 가진 list를 list라는 이름으로 담는다.
    return "achievement/list";
  }


  @GetMapping("view")
  @ResponseBody
  public Object view(String id) throws Exception {
    return achievementService.get(id); // 상세 페이지 뷰 반환
  }

  @GetMapping("delete")
  @ResponseBody
  public Object delete(String id) throws Exception {
    achievementService.delete(id);
    return "Achievement with id" + id + "삭제되었습니다.";
  }

  @PostMapping("add")
  @ResponseBody
  public Object add(@RequestBody Achievement achievement) throws Exception {
    achievementService.add(achievement);
    return achievementService.get(achievement.getId());
  }

  @PostMapping("update")
  @ResponseBody
  public Object update(@RequestBody Achievement achievement) throws Exception {
    achievementService.update(achievement);
    return achievementService.get(achievement.getId());
  }

}