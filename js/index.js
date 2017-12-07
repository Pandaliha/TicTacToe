var app = angular.module("TicTacToe", []);

app.controller("Controller", ["$scope", function($scope) {
	$scope.hmn = "X";
	$scope.cpu = "O";
	$scope.current_player = $scope.hmn;
	$scope.cpu_first = false;
	$scope.hmn_x = true;
	$scope.winner = null;
	$scope.tie = null;
	$scope.board = [[],
				[],
				[]];
	$scope.win_board = [[],
				[],
				[]];
	$scope.message = "Have fun!";

	$scope.newGame = function() {		
		if ($scope.hmn_x) { $scope.hmn = "X"; $scope.cpu = "O" }
		else { $scope.hmn = "O"; $scope.cpu = "X" }
		
		if ($scope.cpu_first) { $scope.current_player = $scope.cpu; }
		else { $scope.current_player = $scope.hmn; }
		
		$scope.winner = null;
		$scope.message = "Do your best!";
		$scope.tie = null;
		$scope.board = [[],
					[],
					[]];
		$scope.win_board = [[],
					[],
					[]];
		if ($scope.cpu_first) {	$scope.makeCPUMove(); }
	};
	
	$scope.makeMove = function(row, col) {
		if (!$scope.board[row][col] && !$scope.winner) {
			$scope.board[row][col] = $scope.current_player;
			$scope.checkWin(row, col);
			$scope.switchPlayer();
		}
	};
	
	$scope.checkWin = function(row, col) {
		var b = $scope.board;
		if (b[0][col] === b[1][col] && b[1][col] === b[2][col]) {
			$scope.winner = b[row][col];
			$scope.message = $scope.winner + " wins!";
			for (var i = 0; i < 3; i++) {
				$scope.win_board[i][col] = 1;
			}
		} else if (b[row][0] === b[row][1] && b[row][1] === b[row][2]) {
			$scope.winner = b[row][col];
			$scope.message = $scope.winner + " wins!";
			for (var i = 0; i < 3; i++) {
				$scope.win_board[row][i] = 1;
			}
		} else if (b[1][1] && b[0][0] === b[1][1] && b[1][1] === b[2][2]) {
			$scope.winner = b[row][col];
			$scope.message = $scope.winner + " wins!";
			for (var i = 0; i < 3; i++) {
				$scope.win_board[i][i] = 1;
			}
		} else if (b[1][1] && b[0][2] === b[1][1] && b[1][1] === b[2][0]) {
			$scope.winner = b[row][col];
			$scope.message = $scope.winner + " wins!";
			$scope.win_board[1][1] = 1;
			$scope.win_board[0][2] = 1;
			$scope.win_board[2][0] = 1;
		} else if ($scope.checkFull()) {
			$scope.winner = "none";
			$scope.tie = true;
			$scope.message = "Tie game!";
		}
	};
	
	$scope.makeCPUMove = function() {		
		for (var i = 0; i < 3; i++) {
			for (var j = 0; j < 3; j++) {
				if (!$scope.board[i][j]) {
					$scope.makeMove(i, j);
					return;
				}
			}
		}
	};
	
	$scope.checkFull = function() {
		for (var i = 0; i < 3; i++) {
			for (var j = 0; j < 3; j++) {
				if (!$scope.board[i][j]) {
					return false;
				}
			}
		}
		return true;
	}
	
	$scope.switchPlayer = function() {
		if ($scope.current_player === $scope.hmn) {
			$scope.current_player = $scope.cpu;
			$scope.makeCPUMove();
		} else {
			$scope.current_player = $scope.hmn;
		}
	}
}])