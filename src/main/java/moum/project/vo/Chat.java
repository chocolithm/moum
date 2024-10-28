package moum.project.vo;

import java.util.Date;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class Chat {
  @EqualsAndHashCode.Include private int no;
  private Chatroom chatroom;
  private User sender;
  private String message;
  private Date chatDate;
}