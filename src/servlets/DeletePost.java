package servlets;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import helpers.Database;
import helpers.Json;

/**
 * Servlet implementation class DeletePost
 */
@WebServlet("/DeletePost")
public class DeletePost extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public DeletePost() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.setContentType("application/json");
		HttpSession session = request.getSession();
		String id_users = (String) session.getAttribute("user");
		String posts_id  = request.getParameter("posts_id");

		PrintWriter out = response.getWriter();
		if (!session.isNew()) {
			Database db = new Database();
			boolean res = db.execute("DELETE FROM cart WHERE posts_id = ?", Integer.parseInt(posts_id));
			boolean res2 = db.execute("DELETE FROM comments WHERE posts_id = ?", Integer.parseInt(posts_id));
			boolean ex = db.execute("DELETE FROM posts WHERE id_users = ? AND posts_id = ?", Integer.parseInt(id_users), Integer.parseInt(posts_id));
			if(res && res2 && ex){
				Json json = new Json();
				json.add("status", 200);
				json.add("message", "Post eliminado");
				response.setStatus(200);
				out.print(json);
				out.flush();
			}else{
				Json json = new Json();
				json.add("status", 500);
				json.add("message", "Error interno del servidor");
				response.setStatus(200);
				out.print(json);
				out.flush();
			}

		} else {
			session.invalidate();
			Json json = new Json();
			json.add("status", 401);
			json.add("message", "Debes logear primero");
			response.setStatus(401);
			out.print(json);
			out.flush();
		}
	}

}